document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
            { id: 2, name: 'Arabica Blande', img: '2.jpg', price: 25000 },
            { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
            { id: 4, name: 'Liberica', img: '4.jpg', price: 35000 },
            { id: 5, name: 'Excelsa', img: '5.jpg', price: 45000 }
        ]
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // Cek Apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // Jika belum ada / cart masih kosong
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // Jika barang sudah ada, tambah quantity dan totalnya
                this.items = this.items.map((item) => {
                    // Jika Barang Berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },

        remove(id) {
            // Ambil item yang mau diremove berdasarkan idnya
            const cartItem = this.items.find((item) => item.id === id);

            // Jika item lebih dari 1
            if (cartItem.quantity > 1) {
                // Kurangi satu per satu
                this.items = this.items.map((item) => {
                    // Jika bukan barang yang di klik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) { // Perbaikan: menggunakan === untuk perbandingan
                // Jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id); // Perbaikan: gunakan 'items' bukan 'item'
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// Konversi Ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
