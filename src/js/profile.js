import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";

const $ = id => document.getElementById(id);

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

let profile = read('mim-profile', {});
let addresses = read('mim-addresses', []);
let settings = read('mim-settings', {
  orders: true,
  recommendations: true,
  offers: false
});

let avatarData = localStorage.getItem('mim-avatar') || '';
let toastTimer;

function toast(message) {
  $('toast').textContent = message;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').hidden = true, 2600);
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function getOrders() {
  let list = read('mim-orders', []);

  if (!Array.isArray(list)) {
    list = [];
  }

  const last = read('mim-last-order', null);

  if (last && !list.some(order =>
    String(order.id || order.orderId) === String(last.id || last.orderId)
  )) {
    list.unshift(last);
  }

  const unique = new Map();

  list.forEach((order, index) => {
    unique.set(String(order.id || order.orderId || index), order);
  });

  return [...unique.values()].reverse();
}

function orderTotal(order) {
  const amount = Number(
    String(
      order.total ??
      order.grandTotal ??
      order.amount ??
      order.totalAmount ??
      0
    ).replace(/[₹,\s]/g, '')
  );

  return Number.isFinite(amount) ? amount : 0;
}

function renderOrders(targetId, limit) {
  const target = $(targetId);
  const all = getOrders();
  const list = limit ? all.slice(0, limit) : all;

  if (!list.length) {
    target.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">▤</div>
        <h4>No orders yet</h4>
        <p>Your purchases will appear here.</p>
        <a class="btn btn-primary" href="shop.html">Start Shopping</a>
      </div>
    `;
    return;
  }

  target.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((order, index) => {
            const id = order.id || order.orderId || `MIM-${1000 + index}`;
            const date = order.date || order.createdAt || order.orderDate || 'Recently';
            const status = order.status || order.paymentStatus || 'Placed';

            let statusClass = 'success';

            if (/deliver/i.test(status)) statusClass = 'delivered';
            else if (/cancel/i.test(status)) statusClass = 'cancelled';
            else if (/pending|processing/i.test(status)) statusClass = 'pending';

            return `
              <tr>
                <td><strong>${esc(String(id).startsWith('MIM') ? id : '#' + id)}</strong></td>
                <td>${esc(String(date).slice(0, 10))}</td>
                <td>₹${orderTotal(order).toLocaleString('en-IN')}</td>
                <td><span class="status ${statusClass}">${esc(status)}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderProfile() {

  const firebaseUser = auth.currentUser;

  const name =
    firebaseUser?.displayName ||
    profile.fullName ||
    profile.name ||
    'Guest';

  const email =
    firebaseUser?.email ||
    profile.email ||
    '';


  $('sidebarName').textContent =
    firebaseUser
      ? `Welcome, ${name.split(' ')[0]}!`
      : 'Welcome, Guest!';


  $('sidebarEmail').textContent =
    email || 'Add your email address';


  $('avatarPreview').innerHTML = avatarData
    ? `<img src="${avatarData}" alt="Profile photo">`
    : esc(name[0].toUpperCase());


  $('fullName').value =
    firebaseUser?.displayName ||
    profile.fullName ||
    profile.name ||
    '';


  $('email').value = email;

  $('phone').value =
    profile.phone || '';

  $('birthDate').value =
    profile.birthDate || '';

  $('aboutMe').value =
    profile.aboutMe || '';


  $('overviewName').textContent =
    name !== 'Guest'
      ? name
      : 'Not added';


  $('overviewEmail').textContent =
    email || 'Not added';
}

function renderStats() {
  const allOrders = getOrders();
  const wishlist = read('marketmine_wishlist', []);
  const cart = read('mim-cart', []);

  $('totalOrders').textContent = allOrders.length;
  $('totalWishlist').textContent = Array.isArray(wishlist) ? wishlist.length : 0;

  $('totalValue').textContent = '₹' +
    allOrders.reduce((sum, order) => sum + orderTotal(order), 0)
      .toLocaleString('en-IN');

  $('cartCount').textContent = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0)
    : 0;
}

function showSection(name) {
  document.querySelectorAll('.panel-section').forEach(section => {
    section.classList.toggle('active', section.id === 'section-' + name);
  });

  document.querySelectorAll('.side-nav [data-section]').forEach(button => {
    button.classList.toggle('active', button.dataset.section === name);
  });

  if (name === 'orders') renderOrders('allOrders');
  if (name === 'addresses') renderAddresses();
  if (name === 'wishlist') renderWishlist();

  if (window.innerWidth < 701) {
    window.scrollTo({
      top: document.querySelector('.profile-layout').offsetTop - 12,
      behavior: 'smooth'
    });
  }
}

document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.section));
});

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.go));
});

$('profileForm').addEventListener('submit', event => {
  event.preventDefault();

  profile = {
    ...profile,
    fullName: $('fullName').value.trim(),
    email: $('email').value.trim(),
    phone: $('phone').value.trim(),
    birthDate: $('birthDate').value,
    aboutMe: $('aboutMe').value.trim()
  };

  save('mim-profile', profile);
  renderProfile();
  toast('Your profile has been saved.');
});

$('avatarInput').addEventListener('change', event => {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
    toast('Choose an image under 2 MB.');
    event.target.value = '';
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    avatarData = reader.result;
    localStorage.setItem('mim-avatar', avatarData);
    renderProfile();
    toast('Profile photo updated.');
  };

  reader.readAsDataURL(file);
});

function renderAddresses() {
  const target = $('addressList');

  if (!addresses.length) {
    target.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">⌖</div>
        <h4>No saved addresses</h4>
        <p>Add a delivery address for your next order.</p>
        <button class="btn btn-primary" type="button" id="emptyAddAddress">＋ Add Address</button>
      </div>
    `;

    $('emptyAddAddress').addEventListener('click', () => openAddressForm());
    return;
  }

  target.innerHTML = addresses.map(address => `
    <article class="address-card">
      <h4>⌖ ${esc(address.label || 'Address')}</h4>
      <p>
        ${esc(address.line || '')}${address.area ? ', ' + esc(address.area) : ''}
        <br>
        ${esc(address.city || '')}, ${esc(address.state || '')} ${esc(address.pin || '')}
        <br>
        Phone: ${esc(address.phone || '')}
      </p>
      <div class="address-actions">
        <button class="btn btn-outline btn-small" data-edit="${esc(address.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-delete="${esc(address.id)}">Remove</button>
      </div>
    </article>
  `).join('');

  target.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', () => openAddressForm(button.dataset.edit));
  });

  target.querySelectorAll('[data-delete]').forEach(button => {
    button.addEventListener('click', () => {
      addresses = addresses.filter(address =>
        String(address.id) !== button.dataset.delete
      );

      save('mim-addresses', addresses);
      renderAddresses();
      toast('Address removed.');
    });
  });
}

function openAddressForm(id = '') {
  $('addressForm').reset();
  $('addressId').value = '';
  $('addressFormTitle').textContent = id ? 'Edit address' : 'Add a new address';
  $('addressFormPanel').hidden = false;

  if (id) {
    const address = addresses.find(item => String(item.id) === String(id));

    if (address) {
      $('addressId').value = address.id;

      const fields = [
        ['addressLabel', 'label'],
        ['addressPhone', 'phone'],
        ['addressLine', 'line'],
        ['addressArea', 'area'],
        ['addressCity', 'city'],
        ['addressState', 'state'],
        ['addressPin', 'pin']
      ];

      fields.forEach(([field, key]) => {
        $(field).value = address[key] || '';
      });
    }
  }

  $('addressFormPanel').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

$('addAddressBtn').addEventListener('click', () => openAddressForm());

$('cancelAddressBtn').addEventListener('click', () => {
  $('addressFormPanel').hidden = true;
});

$('addressForm').addEventListener('submit', event => {
  event.preventDefault();

  const id = $('addressId').value || String(Date.now());

  const address = {
    id,
    label: $('addressLabel').value.trim(),
    phone: $('addressPhone').value.trim(),
    line: $('addressLine').value.trim(),
    area: $('addressArea').value.trim(),
    city: $('addressCity').value.trim(),
    state: $('addressState').value.trim(),
    pin: $('addressPin').value.trim()
  };

  const index = addresses.findIndex(item => String(item.id) === String(id));

  if (index >= 0) {
    addresses[index] = address;
  } else {
    addresses.push(address);
  }

  save('mim-addresses', addresses);
  $('addressFormPanel').hidden = true;
  renderAddresses();
  toast('Address saved successfully.');
});

function renderWishlist() {

    const target = $('wishlistList');

    let wishlist = read('marketmine_wishlist', []);


    if (!Array.isArray(wishlist)) {
        wishlist = [];
    }


    const uniqueWishlist = [];

    wishlist.forEach(product => {

        const name =
            product.name ||
            product.title ||
            product.productName ||
            'Saved product';

        const text =
            product.customization?.text ||
            product.text ||
            "";

        const image =
            product.customization?.image ||
            product.image ||
            product.img ||
            product.imageUrl ||
            product.thumbnail ||
            "";

        const alreadyExists =
            uniqueWishlist.some(item => {

                const itemName =
                    item.name ||
                    item.title ||
                    item.productName ||
                    'Saved product';

                const itemText =
                    item.customization?.text ||
                    item.text ||
                    "";

                const itemImage =
                    item.customization?.image ||
                    item.image ||
                    item.img ||
                    item.imageUrl ||
                    item.thumbnail ||
                    "";

                return (
                    itemName === name &&
                    itemText === text &&
                    itemImage === image
                );

            });


        if (!alreadyExists) {
            uniqueWishlist.push(product);
        }

    });


   
    wishlist = uniqueWishlist;

    save(
        'marketmine_wishlist',
        wishlist
    );


   
    if (!wishlist.length) {

        target.innerHTML = `

            <div
                class="empty-state"
                style="grid-column:1/-1"
            >

                <div class="empty-icon">
                    ♡
                </div>

                <h4>
                    Your wishlist is empty
                </h4>

                <p>
                    Save products you love
                    and find them here later.
                </p>

                <a
                    class="btn btn-primary"
                    href="shop.html"
                >
                    Explore Products
                </a>

            </div>

        `;

        return;
    }


  
    target.innerHTML = wishlist.map(
        (product, index) => {

            const name =
                product.name ||
                product.title ||
                product.productName ||
                'Saved product';


            const price =
                product.price ??
                product.displayed_price ??
                549;


            const image =
                product.customization?.image ||
                product.image ||
                product.img ||
                product.imageUrl ||
                product.thumbnail ||
                "../assets/images/custom-tshirt.png";


            const id =
                product.id ||
                product.productId ||
                "";


            return `

                <article class="wishlist-card">

                    <img
                        src="${esc(image)}"
                        alt="${esc(name)}"
                        onerror="this.style.display='none'"
                    >


                    <h4>
                        ${esc(name)}
                    </h4>


                    <p>
                        ₹${esc(
                            String(price)
                            .replace(/^₹/, '')
                        )}
                    </p>


                    <div class="form-actions">

                        <a
                            class="btn btn-primary btn-small"
                            href="product-detail.html?id=${encodeURIComponent(id)}"
                        >
                            View Product
                        </a>


                        <button
                            class="btn btn-danger btn-small"
                            data-remove="${index}"
                        >
                            Remove
                        </button>

                    </div>

                </article>

            `;

        }
    ).join('');


   
    target
        .querySelectorAll('[data-remove]')
        .forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    const wishlist =
                        read(
                            'marketmine_wishlist',
                            []
                        );


                    wishlist.splice(
                        Number(
                            button.dataset.remove
                        ),
                        1
                    );


                    save(
                        'marketmine_wishlist',
                        wishlist
                    );


                    renderWishlist();

                    renderStats();

                    toast(
                        'Removed from wishlist.'
                    );

                }
            );

        });

}

function fillSettings() {
  $('settingOrders').checked = settings.orders !== false;
  $('settingRecommendations').checked = settings.recommendations !== false;
  $('settingOffers').checked = settings.offers === true;
}

$('saveSettingsBtn').addEventListener('click', () => {
  settings = {
    orders: $('settingOrders').checked,
    recommendations: $('settingRecommendations').checked,
    offers: $('settingOffers').checked
  };

  save('mim-settings', settings);
  toast('Preferences saved.');
});

$('clearProfileBtn').addEventListener('click', () => {
  if (!confirm('Clear your saved profile details and photo from this browser?')) {
    return;
  }

  localStorage.removeItem('mim-profile');
  localStorage.removeItem('mim-avatar');

  profile = {};
  avatarData = '';

  renderProfile();
  toast('Saved profile details cleared.');
});

$('logoutBtn').addEventListener('click', async () => {

  if (!confirm('Are you sure you want to log out?')) {
    return;
  }

  try {

    await signOut(auth);

    toast('Logged out successfully.');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);

  } catch (error) {

    console.error('Logout error:', error);

    toast('Unable to log out. Please try again.');

  }

});

onAuthStateChanged(auth, user => {

  if (user) {

    console.log("Firebase user:", user.email);

  } else {

    console.log("No Firebase user logged in.");

  }

  renderProfile();

});


fillSettings();
renderOrders('recentOrders', 3);
renderStats();
renderAddresses();
renderWishlist();