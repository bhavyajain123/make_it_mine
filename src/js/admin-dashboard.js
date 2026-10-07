
const sampleOrders = [
    {id:"MIM-1048",name:"Aarav Mehta",email:"aarav@example.com",initials:"AM",product:"Custom T-Shirt",date:"02 Oct 2026",amount:1198,status:"Delivered"},
    {id:"MIM-1047",name:"Priya Sharma",email:"priya@example.com",initials:"PS",product:"Personalized Photo Mug",date:"02 Oct 2026",amount:399,status:"Processing"},
    {id:"MIM-1046",name:"Rohan Verma",email:"rohan@example.com",initials:"RV",product:"Custom Hoodie",date:"01 Oct 2026",amount:999,status:"Shipped"},
    {id:"MIM-1045",name:"Ananya Singh",email:"ananya@example.com",initials:"AS",product:"Photo Frame",date:"01 Oct 2026",amount:699,status:"Delivered"},
    {id:"MIM-1044",name:"Kabir Malhotra",email:"kabir@example.com",initials:"KM",product:"Phone Case",date:"30 Sep 2026",amount:499,status:"Processing"},
    {id:"MIM-1043",name:"Ishita Kapoor",email:"ishita@example.com",initials:"IK",product:"Canvas Tote Bag",date:"30 Sep 2026",amount:349,status:"Shipped"},
    {id:"MIM-1042",name:"Arjun Gupta",email:"arjun@example.com",initials:"AG",product:"Custom T-Shirt",date:"29 Sep 2026",amount:599,status:"Cancelled"},
    {id:"MIM-1041",name:"Meera Joshi",email:"meera@example.com",initials:"MJ",product:"Travel Mug",date:"29 Sep 2026",amount:649,status:"Delivered"}
];

const sampleProducts = [
    {id:1,name:"Classic Custom T-Shirt",category:"T-Shirts",price:599,emoji:"👕",stock:42,sold:185},
    {id:2,name:"Personalized Photo Mug",category:"Mugs",price:399,emoji:"☕",stock:8,sold:152},
    {id:3,name:"Good Vibes Hoodie",category:"Hoodies",price:999,emoji:"🧥",stock:25,sold:98},
    {id:4,name:"Custom Phone Case",category:"Phone Cases",price:499,emoji:"📱",stock:4,sold:87},
    {id:5,name:"Minimal Canvas Tote",category:"Tote Bags",price:349,emoji:"👜",stock:31,sold:76},
    {id:6,name:"Personalized Photo Frame",category:"Photo Gifts",price:699,emoji:"🖼️",stock:17,sold:64},
    {id:7,name:"Custom Embroidered Cap",category:"Caps",price:299,emoji:"🧢",stock:21,sold:58},
    {id:8,name:"Memory Cushion",category:"Home Gifts",price:549,emoji:"🛋️",stock:0,sold:35},
    {id:9,name:"Personalized Sweatshirt",category:"Hoodies",price:1199,emoji:"👚",stock:19,sold:51},
    {id:10,name:"Custom Travel Mug",category:"Mugs",price:649,emoji:"🥤",stock:15,sold:44},
    {id:11,name:"Printed Graphic Tee",category:"T-Shirts",price:699,emoji:"🎨",stock:28,sold:41},
    {id:12,name:"Memory Photo Gift",category:"Photo Gifts",price:899,emoji:"🎁",stock:11,sold:30}
];

let orders = [...sampleOrders];
let products = [...sampleProducts];
let currentPage = 1;
const pageSize = 8;

const currency = value => "₹" + Number(value).toLocaleString("en-IN");

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderOrders() {
    const query = document.getElementById("orderSearch").value.toLowerCase().trim();
    const status = document.getElementById("statusFilter").value;

    const filtered = orders.filter(order => {
        const matchesQuery = [order.id,order.name,order.email,order.product].some(value => value.toLowerCase().includes(query));
        const matchesStatus = status === "all" || order.status === status;
        return matchesQuery && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * pageSize;
    const visible = filtered.slice(start, start + pageSize);
    const table = document.getElementById("ordersTable");

    if (!visible.length) {
        table.innerHTML = '<tr><td colspan="7"><div class="empty-state">No orders found. Try another search or filter.</div></td></tr>';
    } else {
        table.innerHTML = visible.map(order => {
            const statusClass = {
                Delivered:"status-delivered",
                Processing:"status-processing",
                Shipped:"status-shipped",
                Cancelled:"status-cancelled"
            }[order.status];

            return `
                <tr>
                    <td><span class="order-id">#${order.id}</span></td>
                    <td>
                        <div class="customer">
                            <div class="customer-avatar">${order.initials}</div>
                            <div>
                                <div class="customer-name">${order.name}</div>
                                <div class="customer-email">${order.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>${order.product}</td>
                    <td>${order.date}</td>
                    <td><strong>${currency(order.amount)}</strong></td>
                    <td>
                        <select class="select-control order-status-select ${statusClass}" data-id="${order.id}" aria-label="Update status for ${order.id}">
                            ${["Processing","Shipped","Delivered","Cancelled"].map(s => `<option value="${s}" ${s===order.status?"selected":""}>${s}</option>`).join("")}
                        </select>
                    </td>
                    <td><button class="row-menu" data-order="${order.id}" aria-label="Order actions">⋯</button></td>
                </tr>
            `;
        }).join("");
    }

    document.getElementById("orderCount").textContent = filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} orders` : "No matching orders";
    document.getElementById("prevPage").disabled = currentPage <= 1;
    document.getElementById("nextPage").disabled = currentPage >= totalPages;

    document.querySelectorAll(".page-btn.active").forEach(button => button.classList.remove("active"));
    const pageButton = document.querySelector(".pagination button:nth-child(2)");
    pageButton.textContent = currentPage;
    pageButton.classList.add("active");
}

function renderProducts() {
    const query = document.getElementById("globalSearch").value.toLowerCase().trim();

    const filtered = products.filter(product =>
        [product.name,product.category,String(product.id)].some(value => value.toLowerCase().includes(query))
    );

    document.getElementById("productList").innerHTML = filtered.length
        ? filtered.slice(0,5).map(product => `
            <div class="product-item">
                <div class="product-art">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category} · ${product.sold} sold</div>
                </div>
                <div>
                    <div class="product-price">${currency(product.price)}</div>
                    <div class="stock ${product.stock <= 8 ? "stock-low":"stock-good"}">${product.stock === 0 ? "Out of stock" : product.stock <= 8 ? product.stock + " left":"In stock"}</div>
                </div>
            </div>
        `).join("")
        : '<div class="empty-state">No matching products found.</div>';
}

function updateOrderStats() {
    document.getElementById("orderBadge").textContent = orders.filter(order => order.status === "Processing").length;
}

function drawChart(period) {
    let current;
    let previous;
    let labels;

    if (period === "week") {
        current = [8,13,10,18,15,23,20];
        previous = [6,9,12,13,11,17,15];
        labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    } else if (period === "year") {
        current = [8,12,10,17,14,21,19,25,22,29,24,30];
        previous = [5,9,8,12,11,15,16,18,17,22,21,24];
        labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    } else {
        current = [8,12,10,17,14,21,18,24,20,15,25,19,27,23,29,24,20,26,22,30,25,21,28,24,29,23,27,20,25,30];
        previous = [5,9,8,12,11,15,16,18,17,22,21,24,18,20,17,23,19,22,16,24,19,23,18,21,20,25,19,22,18,24];
        labels = ["01","05","10","15","20","25","30"];
    }

    const width = 600;
    const height = 190;
    const max = 32;
    const points = current.map((value,index) => ({
        x: index * width / (current.length - 1),
        y: height - value / max * height
    }));
    const previousPoints = previous.map((value,index) => ({
        x: index * width / (previous.length - 1),
        y: height - value / max * height
    }));

    const linePath = points.map((p,index) => `${index === 0 ? "M":"L"} ${p.x} ${p.y}`).join(" ");
    const previousPath = previousPoints.map((p,index) => `${index === 0 ? "M":"L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

    document.getElementById("salesLine").setAttribute("d",linePath);
    document.getElementById("salesArea").setAttribute("d",areaPath);
    document.getElementById("previousLine").setAttribute("d",previousPath);
    document.getElementById("chartLabels").innerHTML = labels.map(label => `<span>${label}</span>`).join("");
}

function downloadCSV() {
    const rows = [
        ["Order ID","Customer","Email","Product","Date","Amount","Status"],
        ...orders.map(order => [order.id,order.name,order.email,order.product,order.date,order.amount,order.status])
    ];

    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "makeitmine-orders-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Orders report exported successfully.");
}

function setSection(section) {
    document.querySelectorAll(".nav-item[data-section]").forEach(item => {
        item.classList.toggle("active", item.dataset.section === section);
    });

    document.getElementById("breadcrumbName").textContent = section;
    document.getElementById("topTitle").textContent = section === "Overview" ? "Dashboard Overview" : section;

    const headingMap = {
        Overview:"Recent Orders",
        Orders:"All Orders",
        Products:"Product Inventory",
        Inventory:"Product Inventory",
        Customers:"Customer Orders",
        Analytics:"Orders and Sales",
        Discounts:"Orders and Promotions",
        Reviews:"Customer Orders",
        Settings:"Store Overview"
    };

    document.getElementById("ordersHeading").textContent = headingMap[section] || "Recent Orders";

    if (section === "Products" || section === "Inventory") {
        document.getElementById("productsHeading").textContent = "Product Inventory";
        document.getElementById("manageProductsButton").textContent = "Add Product ＋";
        document.getElementById("productList").scrollIntoView({behavior:"smooth",block:"center"});
    } else {
        document.getElementById("productsHeading").textContent = "Best Selling Products";
        document.getElementById("manageProductsButton").textContent = "Manage →";
    }

    if (section !== "Overview") {
        document.getElementById("ordersSection").scrollIntoView({behavior:"smooth",block:"start"});
    }

    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}

document.querySelectorAll(".nav-item[data-section]").forEach(item => {
    item.addEventListener("click",() => setSection(item.dataset.section));
});

document.getElementById("orderSearch").addEventListener("input",() => {
    currentPage = 1;
    renderOrders();
});

document.getElementById("statusFilter").addEventListener("change",() => {
    currentPage = 1;
    renderOrders();
});

document.getElementById("globalSearch").addEventListener("input",() => {
    renderProducts();
    currentPage = 1;
    document.getElementById("orderSearch").value = document.getElementById("globalSearch").value;
    renderOrders();
});

document.getElementById("chartPeriod").addEventListener("change",event => {
    drawChart(event.target.value);
    const values = {week:"₹58,240",month:"₹2,48,560",year:"₹24,85,600"};
    document.getElementById("chartTotal").textContent = values[event.target.value];
});

document.getElementById("prevPage").addEventListener("click",() => {
    if (currentPage > 1) {
        currentPage--;
        renderOrders();
    }
});

document.getElementById("nextPage").addEventListener("click",() => {
    const query = document.getElementById("orderSearch").value.toLowerCase().trim();
    const status = document.getElementById("statusFilter").value;
    const count = orders.filter(order =>
        [order.id,order.name,order.email,order.product].some(value => value.toLowerCase().includes(query)) &&
        (status === "all" || order.status === status)
    ).length;

    if (currentPage < Math.ceil(count / pageSize)) {
        currentPage++;
        renderOrders();
    }
});

document.getElementById("ordersTable").addEventListener("change",event => {
    const select = event.target.closest(".order-status-select");
    if (!select) return;

    const order = orders.find(item => item.id === select.dataset.id);
    if (!order) return;

    order.status = select.value;
    renderOrders();
    updateOrderStats();
    showToast(`Order #${order.id} updated to ${order.status}.`);
});

document.getElementById("ordersTable").addEventListener("click",event => {
    const button = event.target.closest("[data-order]");
    if (!button) return;

    const order = orders.find(item => item.id === button.dataset.order);
    if (!order) return;

    showToast(`${order.id} · ${order.name} · ${currency(order.amount)}`);
});

document.getElementById("menuToggle").addEventListener("click",() => {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
});

document.getElementById("overlay").addEventListener("click",() => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
});

document.getElementById("exportButton").addEventListener("click",downloadCSV);

document.getElementById("addProductButton").addEventListener("click",() => {
    const name = prompt("Enter the product name:");
    if (!name || !name.trim()) return;

    const priceInput = prompt("Enter the product price in ₹:");
    if (priceInput === null) return;

    const price = Number(priceInput);
    if (!Number.isFinite(price) || price <= 0) {
        showToast("Please enter a valid product price.");
        return;
    }

    const newProduct = {
        id:Math.max(0,...products.map(product => product.id)) + 1,
        name:name.trim(),
        category:"Custom Gifts",
        price:Math.round(price),
        emoji:"🎁",
        stock:1,
        sold:0
    };

    products.unshift(newProduct);
    renderProducts();
    showToast("Product added to this dashboard session.");
});

document.getElementById("manageProductsButton").addEventListener("click",() => {
    setSection("Products");
    document.getElementById("addProductButton").click();
});

document.getElementById("productsLink").addEventListener("click",() => setSection("Products"));
document.getElementById("categoriesButton").addEventListener("click",() => setSection("Products"));

document.getElementById("viewStore").addEventListener("click",() => {
    window.location.href = "home.html";
});

document.getElementById("logoutButton").addEventListener("click",() => {
    window.location.href = "home.html";
});

document.getElementById("helpButton").addEventListener("click",() => {
    showToast("Contact your store support team for assistance.");
});

document.getElementById("notificationButton").addEventListener("click",() => {
    showToast("You have new store updates to review.");
});

document.getElementById("activityButton").addEventListener("click",() => {
    renderOrders();
    renderProducts();
    showToast("Dashboard information refreshed.");
});

document.getElementById("welcomeTitle").textContent =
    new Date().getHours() < 12 ? "Good morning, Admin! 👋" :
    new Date().getHours() < 17 ? "Good afternoon, Admin! 👋" :
    "Good evening, Admin! 👋";

renderOrders();
renderProducts();
drawChart("month");
updateOrderStats();
