# TODO - Perbaikan Issue Data LocationTab Hilang

## Masalah
Setelah update data di InfoTab berhasil, data di LocationTab menjadi kosong kecuali di-refresh.

## Root Cause
1. Query `dataDefaultRegion` tidak memiliki dependency yang tepat pada region ID
2. Form reset otomatis pada `isSuccessUpdate` yang mempengaruhi semua tab
3. Tidak ada mekanisme untuk membedakan update dari tab mana

## Perbaikan yang Telah Dilakukan

### ✅ 1. Perbaikan useDetailEvent.tsx
- [x] Menambahkan region ID ke query key `dataDefaultRegion`
- [x] Memastikan query re-fetch ketika region berubah

### ✅ 2. Perbaikan LocationTab.tsx  
- [x] Menonaktifkan reset form otomatis pada `isSuccessUpdate`
- [x] Menambahkan tombol reset manual
- [x] Menambahkan fungsi `resetFormWithData`

### ✅ 3. Perbaikan useLocationTab.tsx
- [x] Menambahkan fungsi `resetFormWithData` untuk reset manual
- [x] Memperbaiki tipe data parameter

### ✅ 4. Perbaikan InfoTab.tsx
- [x] Menonaktifkan reset form otomatis pada `isSuccessUpdate`

## Testing yang Perlu Dilakukan
1. Update data di InfoTab, lalu pindah ke LocationTab - data harus tetap ada
2. Update data di LocationTab, lalu pindah ke InfoTab - data harus tetap ada  
3. Test tombol reset manual di LocationTab
4. Verify bahwa query region bekerja dengan benar setelah update

## Catatan
- Reset form sekarang hanya dilakukan secara manual melalui tombol
- Setiap tab tidak saling mempengaruhi form state ketika update berhasil
- Data tetap konsisten antara tabs karena query key yang tepat
