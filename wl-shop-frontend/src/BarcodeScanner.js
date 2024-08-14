import React, { useState } from 'react';

function BarcodeScanner({ onScanItem }) {
    const [barcode, setBarcode] = useState('');

    const handleScan = () => {
        // Simulate a barcode scan (replace with actual scan logic)
        const scannedItem = { name: 'Scanned Item', barcode, quantity: 1, price: 9.99 }; // Added price
        onScanItem(scannedItem);
        setBarcode('');
    };

    return (
        <div className="barcode-scanner">
            <h2>Scan a Item's Barcode</h2>
            <input 
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Enter or scan barcode"
            />
            <button onClick={handleScan}>Scan</button>
        </div>
    );
}

export default BarcodeScanner;
