const SizeGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
        >
          ✖
        </button>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">Size Guide – Men's Footwear</h2>
          <p className="text-sm text-gray-600">
            Dress shoes, Boots, Flats, Sneakers, Sandals, Performance Shoes, Casual Shoes, Thongs, Slippers
          </p>
        </div>

        {/* Table with its own scroll */}
        <div className="max-h-[60vh] overflow-y-auto size-scrollbar">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-100 text-gray-800 ">
                <th className="border px-3 py-2 text-center">AU/UK</th>
                <th className="border px-3 py-2 text-center">US</th>
                <th className="border px-3 py-2 text-center">EU</th>
                <th className="border px-3 py-2 text-center">FOOT LENGTH (CM)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { au: "2", us: "3", eu: "34", cm: "21" },
                { au: "3", us: "4", eu: "35", cm: "21.6" },
                { au: "4", us: "5", eu: "36", cm: "22.5" },
                { au: "5", us: "6", eu: "38", cm: "23.5" },
                { au: "5.5", us: "6.5", eu: "39", cm: "24.1" },
                { au: "6", us: "7", eu: "40", cm: "24.6" },
                { au: "6.5", us: "7.5", eu: "40–41", cm: "24.8" },
                { au: "7", us: "8", eu: "41", cm: "25.4" },
                { au: "7.5", us: "8.5", eu: "41–42", cm: "25.7" },
                { au: "8", us: "9", eu: "42", cm: "26.2" },
                { au: "8.5", us: "9.5", eu: "42–43", cm: "26.7" },
                { au: "9", us: "10", eu: "43", cm: "27" },
                { au: "9.5", us: "10.5", eu: "43–44", cm: "27.3" },
                { au: "10", us: "11", eu: "44", cm: "27.8" },
                { au: "10.5", us: "11.5", eu: "44–45", cm: "28.3" },
                { au: "11", us: "12", eu: "45", cm: "28.6" },
                { au: "11.5", us: "12.5", eu: "45–46", cm: "29" },
                { au: "12", us: "13", eu: "46", cm: "29.4" },
                { au: "12.5", us: "13.5", eu: "46–47", cm: "30.2" },
                { au: "13", us: "14", eu: "47", cm: "31" },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{row.au}</td>
                  <td className="border px-3 py-2 text-center">{row.us}</td>
                  <td className="border px-3 py-2 text-center">{row.eu}</td>
                  <td className="border px-3 py-2 text-center">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
