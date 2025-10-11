import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/rlogo.png';
import cart1 from '../images/cart1.jpg';
import cart2 from '../images/cart2.jpg';
import qr from '../images/qr.png';
import gpay from '../images/gpay.png';
import applepay from '../images/applepay.png';
import paypal from '../images/paypal1.png';
import pay from '../images/pay.png';
import dot from '../images/dot.png';
import { X, Tag } from 'lucide-react';
import '../styles/r_style.css';
import cart from '../images/cart.jpg';
import fram from '../images/Frame.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddToCartData, fetchRemoveFromCart } from '../Store/Slices/addToCartSlice';


function Addtocart() {

    const dispatch = useDispatch();

    const { cartData } = useSelector((state) => state.addToCart);
    // console.log("Cart Data from Redux:", cartData);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        dispatch(fetchAddToCartData());
    }, [dispatch]);

    // Map the cart data
    useEffect(() => {
        if (Array.isArray(cartData)) {
            const mappedItems = cartData.map((item) => ({
                id: item._id,
                name: item.productId?.title,
                image: item.productVarientId?.images?.[0] || "",
                color: item.productVarientId?.color || "N/A",
                size: item.productVarientId?.size || "N/A",
                price: item.productVarientId?.price?.discounted || 0,
                quantity: item.quantity || 1,
                productId: item.productId?._id || null,
                productVarientId: item.productVarientId?._id || null,
            }));
            setCartItems(mappedItems);
        }
    }, [cartData]);


    const [viewState, setViewState] = useState('add-first');
    const [savedAddress, setSavedAddress] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');
    const [selectedDigitalPayment, setSelectedDigitalPayment] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    //   const [discountCode, setDiscountCode] = useState('');

    const discountCodes = [
        {
            id: 1,
            code: 'DRIGULE20',
            description: 'Get 20% OFF',
            subtitle: '$10 OFF on orders above $799',
            minOrder: '(Limited Time)',
            color: 'bg-green-500',
            textColor: 'text-white'
        },
        {
            id: 2,
            code: 'GROCERY80',
            description: 'Get 80% OFF',
            subtitle: 'Get 80% OFF on minimum orders above $50',
            color: 'bg-purple-500',
            textColor: 'text-white'
        },
        {
            id: 3,
            code: 'GROCERY80',
            description: 'Get 80% OFF',
            subtitle: 'Get 80% OFF on minimum orders above $50',
            color: 'bg-purple-500',
            textColor: 'text-white'
        },

    ];

    //   const applyDiscountCode = (code = null) => {
    //     const codeToApply = code || discountCode;
    //     if (codeToApply.trim()) {
    //       alert(`Applied discount code: ${codeToApply}`);
    //       setDiscountCode('');
    //       setIsModalOpen(false);
    //     }
    //   };

    const [firstAddressForm, setFirstAddressForm] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        zipCode: '',
        address: '',
        city: '',
        state: '',
        addressType: 'office',
        openSaturday: true,
        openSunday: false,
        defaultAddress: false
    });

    const [billingAddressForm, setBillingAddressForm] = useState({
        name: '',
        mobile: '',
        zipCode: '',
        address: '',
        city: '',
        state: '',
        addressType: 'office',
        openSaturday: true,
        openSunday: false,
        defaultAddress: false
    });

    const handleFirstAddressChange = (field, value) => {
        setFirstAddressForm(prev => ({ ...prev, [field]: value }));
    };

    const handleBillingAddressChange = (field, value) => {
        setBillingAddressForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveFirstAddress = () => {
        const fullName = `${firstAddressForm.firstName} ${firstAddressForm.lastName}`.trim();
        const fullAddress = `${firstAddressForm.address}, ${firstAddressForm.city} ${firstAddressForm.state}`;

        setSavedAddress({
            name: fullName,
            type: firstAddressForm.addressType === 'office' ? 'Office' : 'Home',
            address: fullAddress,
            postalCode: `${firstAddressForm.zipCode}, Australia`,
            mobile: firstAddressForm.mobile
        });
        setViewState('address-list');
    };

    const handleAddBillingAddress = () => {
        setViewState('add-billing');
    };

    const handleSaveBillingAddress = () => {
        const fullAddress = `${billingAddressForm.address}, ${billingAddressForm.city} ${billingAddressForm.state}`;

        setBillingAddress({
            name: billingAddressForm.name,
            type: billingAddressForm.addressType === 'office' ? 'Office' : 'Home',
            address: fullAddress,
            postalCode: `${billingAddressForm.zipCode}, Australia`,
            mobile: billingAddressForm.mobile
        });


        navigateToTab(3);
    };

    const handleCancel = () => {
        if (viewState === 'add-billing') {
            setViewState('address-list');
        } else {
            setViewState('add-first');
        }
    };

    const [currentTab, setCurrentTab] = useState(1);
    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         name: "Melton peacoat",
    //         color: "Green",
    //         size: "M",
    //         price: 2200,
    //         quantity: 1,
    //         image: cart1
    //     },
    //     {
    //         id: 2,
    //         name: "Melton peacoat",
    //         color: "Green",
    //         size: "M",
    //         price: 2200,
    //         quantity: 2,
    //         image: cart2
    //     }
    // ]);

    const [giftWrap, setGiftWrap] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [province, setProvince] = useState("");
    const [zipCode, setZipCode] = useState("");

    const updateQuantity = (id, change) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (productId, productVarientId) => {
        dispatch(fetchRemoveFromCart({ productId, productVarientId }))
            .unwrap()
            .then(() => {
                setCartItems((items) =>
                    items.filter(
                        (item) =>
                            item.productId !== productId ||
                            item.productVarientId !== productVarientId
                    )
                );
            })
            .catch((err) => console.error("Remove failed:", err));
    };

    // Address form state
    const [addressForm, setAddressForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        number: "",
    });

    // Payment form state
    const [paymentForm, setPaymentForm] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        billingAddress: "",
        billingCity: "",
        billingState: "",
        billingZip: ""
    });

    const applyDiscountCode = () => {
        const validCodes = {
            'SAVE10': { type: 'percentage', value: 10, description: '10% off' },
            'WELCOME20': { type: 'percentage', value: 20, description: '20% off' },
            'FLAT50': { type: 'fixed', value: 50, description: '$50 off' }
        };

        if (validCodes[discountCode.toUpperCase()]) {
            setAppliedDiscount(validCodes[discountCode.toUpperCase()]);
        } else {
            alert('Invalid discount code');
        }
    };

    const calculateDiscountAmount = () => {
        if (!appliedDiscount) return 0;
        if (appliedDiscount.type === 'percentage') {
            return Math.round(subtotal * (appliedDiscount.value / 100));
        }
        return appliedDiscount.value;
    };

    const handleAddressChange = (field, value) => {
        setAddressForm(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentChange = (field, value) => {
        setPaymentForm(prev => ({ ...prev, [field]: value }));
    };

    const validateTab = (tabNumber) => {
        switch (tabNumber) {
            case 2:
                return cartItems.length > 0;
            case 3:
                // FIXED: Allow navigation to preview if we have a saved address
                return savedAddress !== null;
            case 4:
                return true; // Always allow preview
            default:
                return true;
        }
    };

    const navigateToTab = (tabNumber) => {
        if (validateTab(tabNumber)) {
            setCurrentTab(tabNumber);
        } else {
            alert('Please complete the current step before proceeding.');
        }
    };

    const tabs = [
        { id: 1, name: 'Bag', active: true },
        { id: 2, name: 'Address', active: false },
        { id: 3, name: 'Preview', active: false },
        { id: 4, name: 'Payment', active: false }
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const estimatedDelivery = 100;
    const platformFee = 13;
    const giftWrapFee = giftWrap ? 20 : 0;
    const discountAmount = calculateDiscountAmount();
    const total = subtotal + estimatedDelivery + platformFee + giftWrapFee - discountAmount;

    const OrderSummary = ({ showProceedButton = true, buttonText = "Proceed to checkout", onButtonClick }) => (
        <div className=''>
            <div>
                <h2 className='text-[22px] font-semibold'>Order Summary</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg h-fit mt-4">
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span>{itemCount} Item</span>
                        <span>AU$ {subtotal.toLocaleString()}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>AU$ {subtotal.toLocaleString()}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <span>Estimated Delivery</span>
                        <span>AU$ {estimatedDelivery}</span>
                    </div>
                    <hr className="my-4" />
                    {appliedDiscount && (
                        <>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-red-500">- AU$ {discountAmount}</span>
                            </div>
                            <hr className="my-4" />
                        </>
                    )}
                    <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span>AU$ {platformFee}</span>
                    </div>
                    {giftWrap && (
                        <>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <span>Gift Wrap</span>
                                <span>AU$ {giftWrapFee}</span>
                            </div>
                        </>
                    )}
                    <hr className="my-4" />
                    <div className="flex justify-between font-medium text-base">
                        <span>Total</span>
                        <span>AU$ {total.toLocaleString()}</span>
                    </div>
                </div>

            </div>
        </div>
    );

    const renderBagTab = () => {

        if (cartItems.length === 0) {
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="mb-6">
                    <div>
                        <img src={cart} alt="" />
                    </div>
                </div>

                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    Your cart is currently empty.
                </h2>

                <button

                    className="mt-4 px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                    <Link to={'/home'}>Back to Store</Link>
                </button>
            </div>
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 main_container px-0">

                <div className="lg:col-span-2">
                    <div className="space-y-6 overflow-x-auto md:overflow-x-visible custom-scrollbar">
                        <table className="min-w-[600px] md:min-w-full border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="divide-y divide-gray-200 bg-gray-50">
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product</th>
                                    <th className="px-4 py-2 text-sm sm:text-sm font-medium text-gray-700">Price</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Quantity</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Total</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 flex items-center space-x-3 min-w-[180px]">
                                            <img
                                                src={item.image}
                                                className="w-16 h-16 bg-cover rounded-lg bg-gray-100 border-none"
                                            />
                                            <div>
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.color} | {item.size}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium whitespace-nowrap">
                                            AU$ {item.price.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center justify-center bg-gray-50 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium whitespace-nowrap">
                                            AU$ {(item.price * item.quantity).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => removeItem(item.productId, item.productVarientId)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="mt-6 space-y-6">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="gift-wrap"
                                checked={giftWrap}
                                onChange={(e) => setGiftWrap(e.target.checked)}
                                className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                            />
                            <label htmlFor="gift-wrap" className="text-gray-700">
                                Gift wrap your purchase for just US$ 20
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Order special instructions</h3>
                                <textarea
                                    placeholder="Write your instructions..."
                                    value={specialInstructions}
                                    onChange={(e) => setSpecialInstructions(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
                                />
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Estimates Delivery</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">
                                            Province <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={province}
                                            onChange={(e) => setProvince(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                                        >
                                            <option value="">Select State</option>
                                            <option value="NSW">New South Wales</option>
                                            <option value="VIC">Victoria</option>
                                            <option value="QLD">Queensland</option>
                                            <option value="WA">Western Australia</option>
                                            <option value="SA">South Australia</option>
                                            <option value="TAS">Tasmania</option>
                                            <option value="ACT">Australian Capital Territory</option>
                                            <option value="NT">Northern Territory</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">
                                            ZIP code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter ZIP code"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                        Calculate Shipping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Add a discount code</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    value={discountCode}
                                    onClick={() => setIsModalOpen(true)}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg w-full"
                                />
                                <button
                                    onClick={applyDiscountCode}
                                    className="px-6 py-3 rounded-r-lg bg-white border border-gray-300"
                                >
                                    Apply
                                </button>
                            </div>
                            {appliedDiscount && (
                                <div className="text-green-600 text-sm mt-2">
                                    ✓ {appliedDiscount.description} applied
                                </div>
                            )}
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h2 className="text-xl font-semibold">Apply Coupon</h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-4">
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Add a discount code</p>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                placeholder="Enter code"
                                                value={discountCode}
                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none"
                                            />
                                            <button
                                                onClick={() => applyDiscountCode()}
                                                className="px-6 py-3 border border-gray-300 rounded-r-lg"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3 overflow-y-auto max-h-80">
                                        {discountCodes.map((coupon, index) => (
                                            <div key={coupon.id} className="flex gap-3">
                                                <div
                                                    className={`rounded-l-lg border-r-4 border-white border-dashed ${index === 0 ? "bg-green-500" :
                                                        index === 1 ? "bg-red-500" : "bg-blue-500"
                                                        }`}
                                                >
                                                    <div className="text-whitet r_text writing-mode-vertical">
                                                        Discount
                                                    </div>
                                                </div>

                                                <div className="p-4 w-full border rounded-r-lg">
                                                    <div className="mb-3">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-gray-700 font-medium">{coupon.description}</p>
                                                            </div>
                                                            <div>
                                                                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                                                    <img src={dot} alt="" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <h3 className="font-bold text-lg">{coupon.code}</h3>
                                                        <p className="text-sm text-gray-600">{coupon.subtitle}</p>
                                                        {coupon.minOrder && (
                                                            <p className="text-sm text-gray-500">{coupon.minOrder}</p>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => applyDiscountCode(coupon.code)}
                                                        className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                                    >
                                                        Apply Code
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>{itemCount} Item</span>
                            <span>AU$ {subtotal.toLocaleString()}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>AU$ {subtotal.toLocaleString()}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <span>Estimated Delivery</span>
                            <span>AU$ {estimatedDelivery}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <span>Platform Fee</span>
                            <span>AU$ {platformFee}</span>
                        </div>
                        {giftWrap && (
                            <div className="flex justify-between">
                                <span>Gift Wrap</span>
                                <span>AU$ {giftWrapFee}</span>
                            </div>
                        )}
                        {appliedDiscount && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount ({appliedDiscount.description})</span>
                                <span>-AU$ {discountAmount}</span>
                            </div>
                        )}
                        <hr className="my-4" />
                        <div className="flex justify-between font-medium text-base">
                            <span>Total</span>
                            <span>AU$ {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigateToTab(2)}
                        className="w-full mt-6 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
                        disabled={cartItems.length === 0}
                    >
                        Proceed to checkout
                    </button>
                </div>
            </div>
        );
    };

    // const renderEmptyCart = () => (

    // );

    const renderAddressTab = () => {

        if (viewState === 'add-first') {
            return (
                <div className='grid md:grid-cols-4 gap-4 md:justify-between main_container sm:grid-cols-1 sm:justify-center'>
                    <div className="p-4 rounded-md col-span-2" style={{ backgroundColor: "#F9FAFB" }}>
                        <div className="space-y-6">
                            <div>
                                <h2 className='text-[22px] font-semibold'>Contact Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        value={firstAddressForm.firstName}
                                        onChange={(e) => handleFirstAddressChange('firstName', e.target.value)}
                                        placeholder='Enter Your First Name'
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        value={firstAddressForm.lastName}
                                        onChange={(e) => handleFirstAddressChange('lastName', e.target.value)}
                                        placeholder='Enter Your Last Name'
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <input
                                    type="text"
                                    value={firstAddressForm.mobile}
                                    onChange={(e) => handleFirstAddressChange('mobile', e.target.value)}
                                    placeholder='Enter Your Number'
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <h2 className='text-[22px] font-semibold'>Address</h2>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP code</label>
                                <input
                                    type="text"
                                    value={firstAddressForm.zipCode}
                                    onChange={(e) => handleFirstAddressChange('zipCode', e.target.value)}
                                    placeholder='Enter Your ZIP code'
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={firstAddressForm.address}
                                    onChange={(e) => handleFirstAddressChange('address', e.target.value)}
                                    placeholder='(locality, building, Street)'
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        value={firstAddressForm.city}
                                        onChange={(e) => handleFirstAddressChange('city', e.target.value)}
                                        placeholder='City'
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        value={firstAddressForm.state}
                                        onChange={(e) => handleFirstAddressChange('state', e.target.value)}
                                        placeholder='State'
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className='text-[22px] font-semibold'>Address Type</h2>
                                <div className="flex gap-4 mb-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value="home"
                                            checked={firstAddressForm.addressType === 'home'}
                                            onChange={(e) => handleFirstAddressChange('addressType', e.target.value)}
                                            className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"

                                        />
                                        <span className='mt-2'>Home</span>

                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value="office"
                                            checked={firstAddressForm.addressType === 'office'}
                                            onChange={(e) => handleFirstAddressChange('addressType', e.target.value)}
                                            className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                        />
                                        <span className='mt-2'>Office</span>


                                    </label>
                                </div>
                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm mb-3">If your office open on weekends?</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={firstAddressForm.openSaturday}
                                                onChange={(e) => handleFirstAddressChange('openSaturday', e.target.checked)}
                                                className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                                            />
                                            <span className="text-sm">Open on Saturday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={firstAddressForm.openSunday}
                                                onChange={(e) => handleFirstAddressChange('openSunday', e.target.checked)}
                                                className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                                            />
                                            <span className="text-sm">Open on Sunday</span>
                                        </label>
                                    </div>
                                </div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={firstAddressForm.defaultAddress}
                                        onChange={(e) => handleFirstAddressChange('defaultAddress', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                                    />
                                    <span className="text-sm">Set my default address</span>
                                </label>
                            </div>
                            <button
                                onClick={handleSaveFirstAddress}
                                className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-full py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className='lg:col-span-2  md:col-span-2 col-span-1 r_responsive' style={{ gridColumnStart: '4' }}>

                        <OrderSummary onButtonClick={() => navigateToTab(3)} />
                    </div>
                </div>
            );
        }

        // Second Image - Address List View
        if (viewState === 'address-list') {
            return (
                <div className='grid grid-cols-4 gap-4 justify-between main_container'>
                    <div className="p-4 rounded-md col-span-2" style={{ backgroundColor: "#F9FAFB" }}>
                        <div className="space-y-6">
                            <div>
                                <h2 className='text-[22px] font-semibold'>Select Delivery Address</h2>
                            </div>

                            {savedAddress && (
                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="radio"
                                                name="selectedAddress"
                                                defaultChecked
                                                className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium text-gray-900">{savedAddress.name}</h3>
                                                    <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded">
                                                        {savedAddress.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{savedAddress.address}</p>
                                                <p className="text-sm text-gray-600">{savedAddress.postalCode}</p>
                                                <p className="text-sm text-gray-600">Mobile: {savedAddress.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                            Remove
                                        </button>
                                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleAddBillingAddress}
                                className="flex  gap-2  font-medium "
                            >
                                <span className="text-xl text-orange-500">+</span>
                                <span className='mt-1'>
                                    Add Billing Address
                                </span>
                            </button>
                        </div>
                    </div>
                    <div></div>
                    <OrderSummary onButtonClick={() => navigateToTab(3)} />
                </div>
            );
        }

        // Third Image - Add Billing Address View
        if (viewState === 'add-billing') {
            return (
                <div className='grid grid-cols-4 gap-4 justify-between main_container'>
                    <div className="p-4 rounded-md col-span-2" style={{ backgroundColor: "#F9FAFB" }}>
                        <div className="space-y-6">
                            <div>
                                <h2 className='text-[22px] font-semibold'>Select Delivery Address</h2>
                            </div>

                            {/* Show existing saved address */}
                            {savedAddress && (
                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="radio"
                                                name="selectedAddress"
                                                defaultChecked
                                                className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium text-gray-900">{savedAddress.name}</h3>
                                                    <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded">
                                                        {savedAddress.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{savedAddress.address}</p>
                                                <p className="text-sm text-gray-600">{savedAddress.postalCode}</p>
                                                <p className="text-sm text-gray-600">Mobile: {savedAddress.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                            Remove
                                        </button>
                                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Add Billing Address Form */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-lg mb-4">Add Billing Address</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={billingAddressForm.name}
                                            onChange={(e) => handleBillingAddressChange('name', e.target.value)}
                                            placeholder="Enter Your Name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                        <input
                                            type="text"
                                            value={billingAddressForm.mobile}
                                            onChange={(e) => handleBillingAddressChange('mobile', e.target.value)}
                                            placeholder="Enter Your Number"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">ZIP code</label>
                                                <input
                                                    type="text"
                                                    value={billingAddressForm.zipCode}
                                                    onChange={(e) => handleBillingAddressChange('zipCode', e.target.value)}
                                                    placeholder="Enter Your ZIP code"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    value={billingAddressForm.address}
                                                    onChange={(e) => handleBillingAddressChange('address', e.target.value)}
                                                    placeholder="(locality, building, Street)"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">City</label>
                                                    <input
                                                        type="text"
                                                        value={billingAddressForm.city}
                                                        onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                                                        placeholder="City"
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">State</label>
                                                    <input
                                                        type="text"
                                                        value={billingAddressForm.state}
                                                        onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                                                        placeholder="State"
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Address Type</label>
                                        <div className="flex gap-4 mb-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="billingAddressType"
                                                    value="home"
                                                    checked={billingAddressForm.addressType === 'home'}
                                                    onChange={(e) => handleBillingAddressChange('addressType', e.target.value)}
                                                    className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                                />
                                                <span>Home</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="billingAddressType"
                                                    value="office"
                                                    checked={billingAddressForm.addressType === 'office'}
                                                    onChange={(e) => handleBillingAddressChange('addressType', e.target.value)}
                                                    className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                                />
                                                <span>Office</span>
                                            </label>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-2">If your office open on weekends?</p>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={billingAddressForm.openSaturday}
                                                        onChange={(e) => handleBillingAddressChange('openSaturday', e.target.checked)}
                                                        className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                                                    />
                                                    <span className="text-sm">Open on Saturday</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={billingAddressForm.openSunday}
                                                        onChange={(e) => handleBillingAddressChange('openSunday', e.target.checked)}
                                                        className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                                                    />
                                                    <span className="text-sm">Open on Sunday</span>
                                                </label>
                                            </div>
                                        </div>

                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={billingAddressForm.defaultAddress}
                                                onChange={(e) => handleBillingAddressChange('defaultAddress', e.target.checked)}
                                                className="w-4 h-4 text-orange-500 rounded custom-checkbox"
                                            />
                                            <span className="text-sm">Set my default address</span>
                                        </label>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleSaveBillingAddress}
                                            className="flex-1 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <OrderSummary onButtonClick={() => navigateToTab(3)} />
                </div>
            );
        }
    };

    const renderPreviewTab = () => (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 main_container">
                <div className="space-y-6">
                    <div>
                        <div>
                            <div>
                                <h3 className="font-medium mb-4">Preview Items</h3>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 p-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 bg-cover rounded" />
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>

                                        <span className="font-medium">AU$ {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm">Qty: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Delivering to Address</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            {savedAddress ? (
                                <>
                                    <div className='flex gap-3'>

                                        <div >
                                            <input
                                                type="radio"
                                                name="selectedAddress"
                                                defaultChecked
                                                className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{savedAddress.name}</p>
                                            <p>{savedAddress.address}</p>
                                            <p>{savedAddress.postalCode}</p>
                                            <p>Mobile: {savedAddress.mobile}</p>
                                        </div>
                                    </div>

                                </>
                            ) : (
                                <p className="text-gray-500">No delivery address selected</p>
                            )}
                        </div>
                    </div>
                    {billingAddress && (
                        <div>
                            <h3 className="font-medium mb-4">Billing Address</h3>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="font-medium">{billingAddress.name}</p>
                                <p>{billingAddress.address}</p>
                                <p>{billingAddress.postalCode}</p>
                                <p>Mobile: {billingAddress.mobile}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-medium mb-4">Order Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>AU$ {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>AU$ {estimatedDelivery}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Platform Fee</span>
                            <span>AU$ {platformFee}</span>
                        </div>
                        {giftWrap && (
                            <div className="flex justify-between">
                                <span>Gift Wrap</span>
                                <span>AU$ {giftWrapFee}</span>
                            </div>
                        )}
                        {appliedDiscount && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount ({appliedDiscount.description})</span>
                                <span>-AU$ {discountAmount}</span>
                            </div>
                        )}
                        <hr />
                        <div className="flex justify-between font-medium text-base">
                            <span>Total</span>
                            <span>AU$ {total.toLocaleString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigateToTab(4)}
                        className="w-full mt-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600"
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );

    const [showOrderModal, setShowOrderModal] = useState(false);

    const renderPaymentTab = () => {
        const handlePaymentSuccess = () => {
            setShowOrderModal(true);
        };

        return (
            <>
                <div className="p-6">
                    <div className="grid grid-cols-1 md: lg:grid-cols-3 gap-8 main_container">

                        <div>
                            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                            <div className="space-y-4">

                                <div
                                    className={`p-4 border-l-4 cursor-pointer ${selectedPaymentMethod === 'credit'
                                        ? 'border-orange-500 bg-gray-50'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                    onClick={() => setSelectedPaymentMethod('credit')}
                                >
                                    <div className="font-medium text-gray-800">Credit / Debit Card</div>
                                </div>

                                <div
                                    className={`p-4 border-l-4 cursor-pointer ${selectedPaymentMethod === 'digital'
                                        ? 'border-orange-500 bg-gray-50'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                    onClick={() => setSelectedPaymentMethod('digital')}
                                >
                                    <div className="font-medium text-gray-800">Digital Payments</div>
                                </div>

                                <div
                                    className={`p-4 border-l-4 cursor-pointer ${selectedPaymentMethod === 'bnpl'
                                        ? 'border-orange-500 bg-gray-50'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                    onClick={() => setSelectedPaymentMethod('bnpl')}
                                >
                                    <div className="font-medium text-gray-800">BNPL</div>
                                </div>

                                <div
                                    className={`p-4 border-l-4 cursor-pointer ${selectedPaymentMethod === 'cod'
                                        ? 'border-orange-500 bg-gray-50'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                    onClick={() => setSelectedPaymentMethod('cod')}
                                >
                                    <div className="font-medium text-gray-800">Cash on Delivery</div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-12'>
                            {selectedPaymentMethod === 'credit' && (
                                <div className='bg-gray-50 p-3 rounded-lg'>
                                    <h3 className="text-lg font-medium mb-4">Credit / Debit Card</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name Same as Card"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Valid Card (MM/YY)"
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={handlePaymentSuccess}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            )}
                            {selectedPaymentMethod === 'digital' && (
                                <div className='bg-gray-50 p-3 rounded-lg'>
                                    <h3 className="text-xl font-medium mb-4">Digital Payments</h3>
                                    <hr className='mb-4' />
                                    <div className="mb-6">
                                        <div className="flex items-center mb-2 gap-2">
                                            <input
                                                type="radio"
                                                id="scan"
                                                name="digitalPayment"
                                                className="mt-2 appearance-none sm:h-4 sm:w-4 h-3 w-3 rounded-full border border-[var(--text-orange)] bg-orange-200 checked:ring-1 checked:ring-[var(--text-orange)] checked:ring-offset-1 checked:ring-offset-orange-100 checked:bg-[var(--text-orange)]"

                                                checked={selectedDigitalPayment === 'scan'}
                                                onChange={() => setSelectedDigitalPayment('scan')}
                                            />
                                            <label htmlFor="scan" className="font-medium mt-2">Scan</label>
                                        </div>
                                        <div>
                                            <div className=" h-20  mb-2 flex items-center  gap-3">
                                                <div>
                                                    <img src={qr} alt="" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-3">Use any app on your phone</p>
                                                    <div className="flex space-x-2 mb-4">
                                                        <div>
                                                            <img src={gpay} alt="" />
                                                        </div>
                                                        <div>
                                                            <img src={applepay} alt="" />
                                                        </div>
                                                        <div>
                                                            <img src={paypal} alt="" />
                                                        </div>
                                                        <div>
                                                            <img src={pay} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handlePaymentSuccess}
                                                className="w-full mb-0 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition-colors mb-6"
                                                style={{ marginBottom: "0" }}
                                            >
                                                Pay Now
                                            </button>

                                        </div>
                                    </div>
                                    <hr className='mb-3' />

                                    <div className="space-y-3">
                                        {[
                                            { id: 'paypal', name: 'PayPal', image: paypal },
                                            { id: 'googlepay', name: 'Google Pay', image: gpay },
                                            { id: 'samsungpay', name: 'Samsung Pay', image: pay },
                                            { id: 'applepay', name: 'Apple Pay', image: applepay }
                                        ].map((payment) => (
                                            <div
                                                key={payment.id}
                                                className="flex items-center justify-between p-3   rounded-md hover:bg-gray-50"
                                            >
                                                <div className="flex items-center">

                                                    {payment.image ? (
                                                        <img
                                                            src={payment.image}
                                                            alt={payment.name}
                                                            className="w-8 h-6 object-contain mr-3"
                                                        />
                                                    ) : (
                                                        <div className={`w-8 h-6 ${payment.color} rounded mr-3`}></div>
                                                    )}

                                                    <span className="font-medium">{payment.name}</span>
                                                </div>

                                                <input
                                                    type="radio"
                                                    name="digitalPayment"
                                                    value={payment.id}
                                                    className="accent-orange-500 peer appearance-none w-4 h-4 border-2  rounded-full checked:border-orange-500 checked:bg-orange-500 focus:ring-2 focus:ring-orange-200"
                                                    checked={selectedDigitalPayment === payment.id}
                                                    onChange={(e) => setSelectedDigitalPayment(e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedPaymentMethod === 'bnpl' && (
                                <div className='bg-gray-50 p-3 rounded-lg'>
                                    <h3 className="text-lg font-medium mb-4">BNPL</h3>
                                    <hr className='mb-5' />
                                    <div className="space-y-3">
                                        {[
                                            { id: 'paypal', name: 'PayPal', image: paypal },
                                            { id: 'googlepay', name: 'Google Pay', image: gpay },
                                            { id: 'samsungpay', name: 'Samsung Pay', image: pay },

                                        ].map((payment) => (
                                            <div key={payment.id} className="flex items-center justify-between p-3  rounded-md hover:bg-gray-50">
                                                <div className="flex items-center">
                                                    {payment.image ? (
                                                        <img
                                                            src={payment.image}
                                                            alt={payment.name}
                                                            className="w-8 h-6 object-contain mr-3"
                                                        />
                                                    ) : (
                                                        <div className={`w-8 h-6 ${payment.color} rounded mr-3`}></div>
                                                    )}
                                                    <span className="font-medium">{payment.name}</span>
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="digitalPayment"
                                                    value={payment.id}
                                                    className="accent-orange-500 peer appearance-none w-4 h-4 border-2 rounded-full checked:border-orange-500 checked:bg-orange-500 "
                                                    checked={selectedDigitalPayment === payment.id}
                                                    onChange={(e) => setSelectedDigitalPayment(e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            )}

                            {selectedPaymentMethod === 'cod' && (
                                <div className='bg-gray-50 p-3 rounded-lg'>
                                    <h1 className=" font-midium  mb-4 text-2xl" >Pay at your doorstep</h1>
                                    <hr className='mb-5' />
                                    <button
                                        onClick={handlePaymentSuccess}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <OrderSummary />
                        </div>
                    </div>
                </div>

                {/* Order Success Modal */}
                {showOrderModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
                        <div className="bg-white rounded-lg p-6 max-w-md w-full  mx-4 relative">
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>

                            <div className="text-center">
                                <div className="mb-4">
                                    <div className="  flex items-center justify-center mx-auto mb-4">
                                        <div>
                                            <img src={fram} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-semibold mb-2">Thanks for</h2>
                                <h2 className='text-2xl font-semibold mb-2'>Shopping with us!</h2>

                                <div className="text-gray-600 mb-4">
                                    <p>Delivery by <strong>Sun, 14th Sep 2025</strong></p>
                                    <p className="text-sm">Order ID: AUOD20250910_001234</p>
                                </div>

                                <button
                                    onClick={() => setShowOrderModal(false)}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition-colors"

                                >
                                    <Link to={"/profile/Orders"}>

                                        Track & Manage Order
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };
    const renderTabContent = () => {
        switch (currentTab) {
            case 1: return renderBagTab();
            case 2: return renderAddressTab();
            case 3: return renderPreviewTab();
            case 4: return renderPaymentTab();
            default: return renderBagTab();
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <section className='mx-5 py-5 main_container'>
                <div className='flex justify-between items-center my-4'>
                    <div>
                        <div className='flex items-center gap-1'>
                            <div>
                                <img src={logo} alt="" />
                            </div>
                            <div>
                                <h1 className='uppercase font-bold font-large'>Coralbay</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to="" className='underline'>Continue Shopping</Link>
                    </div>
                </div>
            </section>

            <div className="px-6 pt-4 " style={{ backgroundColor: "#F9FAFB" }}>
                <div className="flex flex-wrap md:flex-nowrap text-sm justify-between main_container">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => navigateToTab(tab.id)}
                            className={`w-full pb-4 font-medium border-b-2 transition-colors ${currentTab === tab.id
                                ? 'border-orange-500'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                } ${currentTab > tab.id ? 'text-gray-900' : ''}`}
                        >
                            {tab.id}. {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="px-6 py-8">
                {renderTabContent()}
            </main>
        </div>
    );
}

export default Addtocart;
