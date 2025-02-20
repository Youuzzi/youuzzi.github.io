document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: 'product1.jpg', price: 20000 },
            { id: 2, name: 'Arabica Blande', img: 'product2.jpg', price: 25000 },
            { id: 3, name: 'Primo Passo', img: 'product3.jpg', price: 30000 },
            { id: 4, name: 'Liberica', img: 'product4.jpg', price: 35000 },
            { id: 5, name: 'Excelsa', img: 'product5.jpg', price: 45000 }
        ],
        selectedItem: null,
        showItemDetail(item) {
            console.log('showItemDetail dipanggil:', item);
            console.log('item.img:', item.img);
            this.selectedItem = item;

            this.$nextTick(() => {
                const modalImage = document.getElementById('modal-image');
                modalImage.src = `img/product/${item.img}`;
              });

            // Buka modal
            const modal = document.getElementById('item-detail-modal');
            modal.style.display = 'flex';
        },
        closeModal() {
            const modal = document.getElementById('item-detail-modal');
            modal.style.display = 'none';
        }
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // Cek Apakah ada barang yang sama di cart
            const cartItem = this.items.find(item => item.id === newItem.id);

            // Jika belum ada / cart masih kosong
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // Jika barang sudah ada, tambah quantity dan totalnya
                this.items = this.items.map(item => {
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
            const cartItem = this.items.find(item => item.id === id);

            if (!cartItem) return; // Error handling jika item tidak ditemukan

            // Jika item lebih dari 1
            if (cartItem.quantity > 1) {
                this.items = this.items.map(item => {
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
            } else {
                // Jika barangnya sisa 1
                this.items = this.items.filter(item => item.id !== id);
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
        minimumFractionDigits: 0
    }).format(number);
};
