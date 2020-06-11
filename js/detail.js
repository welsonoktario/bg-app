var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var kategori = $("#kategori");
var jenis = $('#jenis');
var harga = $("#harga");
var lt = $("#lt");
var lb = $("#lb");
var kt = $("#kt");
var km = $("#km");
var lantai = $("#lantai");
var furnished = $("#furnished");

$.get(`http://localhost:8000/api/property/${id}`, function (data) {
	var d = data[0];
	var f = d.detail_property.furnished === 1 ? "Ya" : "Tidak";

	console.log(d);
	kategori.html(`Kategori: ${d.kategori.nama}`);
	jenis.html(`Jenis: ${d.jenis_property.nama}`);
	harga.html(`Harga: ${d.harga}`);
	lt.html(`Luas Tanah: ${d.luas_tanah}`);
	lb.html(`Luas Bangunan: ${d.luas_bangunan}`);
	kt.html(`Jumlah Kamar Tidur: ${d.detail_property.jumlah_kamar_tidur}`);
	km.html(`Jumlah Kamar Mandi: ${d.detail_property.jumlah_kamar_mandi}`);
	lantai.html(`Lantai: ${d.detail_property.jumlah_lantai}`);
	furnished.html(`Furnished: ${f}`)
});