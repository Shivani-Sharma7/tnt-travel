'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, user, saveOrder } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdvancePayment, setIsAdvancePayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'processing' | 'success' | 'failed'>('details');
  const [paymentError, setPaymentError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    bankName: ''
  });
  const [paymentValidationErrors, setPaymentValidationErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    bankName: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    preferredDay: '',
    timeSlot: '',
    gender: '',
    age: '',
    comments: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    preferredDay: '',
    timeSlot: '',
    gender: '',
    age: '',
    comments: ''
  });

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
    { value: 'any-day', label: 'Any Day' }
  ];

  const timeSlots = [
    { value: 'morning-early', label: '8:00 AM - 10:00 AM', description: 'Early Morning' },
    { value: 'morning', label: '10:00 AM - 12:00 PM', description: 'Morning' },
    { value: 'afternoon-early', label: '12:00 PM - 2:00 PM', description: 'Early Afternoon' },
    { value: 'afternoon', label: '2:00 PM - 4:00 PM', description: 'Afternoon' },
    { value: 'evening-early', label: '4:00 PM - 6:00 PM', description: 'Early Evening' },
    { value: 'evening', label: '6:00 PM - 8:00 PM', description: 'Evening' },
    { value: 'night', label: '8:00 PM - 10:00 PM', description: 'Night' },
    { value: 'any-time', label: 'Any Time', description: 'Flexible' }
  ];

  useEffect(() => {
    setMounted(true);
    // Redirect to cart if no items
    if (items.length === 0) {
      router.push('/cart');
    }
    
    // Pre-populate form with user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        mobile: user.mobile || ''
      }));
    }
  }, [items, router, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear payment validation error when user starts typing
    if (paymentValidationErrors[name as keyof typeof paymentValidationErrors]) {
      setPaymentValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      mobile: '',
      preferredDay: '',
      timeSlot: '',
      gender: '',
      age: '',
      comments: ''
    };
    
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    // Preferred day validation - only required for customized trip plans
    if (getItemTypes().includes('trip') && !formData.preferredDay) {
      newErrors.preferredDay = 'Please select a preferred day';
      isValid = false;
    }

    // Time slot validation - only required for customized trip plans
    if (getItemTypes().includes('trip') && !formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred time slot';
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }

    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
      isValid = false;
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setPaymentStep('payment');
      setShowPayment(true);
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TNT-${timestamp}-${random}`.toUpperCase();
  };

  const validatePaymentDetails = () => {
    const newErrors = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      upiId: '',
      bankName: ''
    };
    
    let isValid = true;

    if (selectedPaymentMethod === 'Card') {
      // Card number validation (16 digits)
      const cardNumberRegex = /^\d{16}$/;
      if (!paymentDetails.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
        isValid = false;
      } else if (!cardNumberRegex.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        isValid = false;
      }

      // Expiry date validation (MM/YY format)
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!paymentDetails.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
        isValid = false;
      } else if (!expiryRegex.test(paymentDetails.expiryDate)) {
        newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
        isValid = false;
      }

      // CVV validation (3-4 digits)
      const cvvRegex = /^\d{3,4}$/;
      if (!paymentDetails.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
        isValid = false;
      } else if (!cvvRegex.test(paymentDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
        isValid = false;
      }

      // Card name validation
      if (!paymentDetails.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
        isValid = false;
      } else if (paymentDetails.cardName.trim().length < 2) {
        newErrors.cardName = 'Please enter a valid cardholder name';
        isValid = false;
      }
    }

    if (selectedPaymentMethod === 'UPI') {
      // UPI ID validation
      const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
      if (!paymentDetails.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
        isValid = false;
      } else if (!upiRegex.test(paymentDetails.upiId.trim())) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g., user@paytm)';
        isValid = false;
      }
    }

    if (selectedPaymentMethod === 'NetBanking') {
      // Bank name validation
      if (!paymentDetails.bankName.trim()) {
        newErrors.bankName = 'Please select a bank';
        isValid = false;
      }
    }

    setPaymentValidationErrors(newErrors);
    return isValid;
  };

  const processPayment = async (orderId: string) => {
    // Simulate API call to payment gateway
    const paymentData = {
      orderId,
      amount: getPayableAmount(),
      currency: 'INR',
      paymentMethod: selectedPaymentMethod,
      customerDetails: {
        name: formData.name,
        email: user?.email || '',
        mobile: formData.mobile
      },
      paymentDetails: selectedPaymentMethod === 'Card' ? {
        cardNumber: paymentDetails.cardNumber.replace(/\s/g, ''),
        expiryDate: paymentDetails.expiryDate,
        cvv: paymentDetails.cvv,
        cardName: paymentDetails.cardName
      } : selectedPaymentMethod === 'UPI' ? {
        upiId: paymentDetails.upiId
      } : selectedPaymentMethod === 'NetBanking' ? {
        bankName: paymentDetails.bankName
      } : {},
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.type
      }))
    };

    // Simulate payment gateway response
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate different payment outcomes based on method
    const successRates = {
      'UPI': 0.95,
      'Card': 0.90,
      'NetBanking': 0.85,
      'COD': 1.0
    };
    
    const isPaymentSuccessful = Math.random() < (successRates[selectedPaymentMethod as keyof typeof successRates] || 0.9);
    
    return {
      success: isPaymentSuccessful,
      transactionId: isPaymentSuccessful ? `TXN${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase() : null,
      message: isPaymentSuccessful ? 'Payment successful' : 'Payment failed',
      gatewayResponse: isPaymentSuccessful ? {
        status: 'SUCCESS',
        amount: getPayableAmount(),
        currency: 'INR',
        timestamp: new Date().toISOString()
      } : {
        status: 'FAILED',
        errorCode: 'PAYMENT_DECLINED',
        errorMessage: 'Payment was declined by the bank'
      }
    };
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      setPaymentError('Please select a payment method');
      return;
    }

    // Validate payment details based on selected method
    if (!validatePaymentDetails()) {
      setPaymentError('Please fill in all required payment details correctly');
      return;
    }

    setPaymentError('');
    setPaymentStep('processing');
    setIsProcessing(true);

    // Generate order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    try {
      const paymentResult = await processPayment(newOrderId);

      if (paymentResult.success) {
        setPaymentStep('success');
        
        // Save order to history
        const orderData = {
          orderId: newOrderId,
          transactionId: paymentResult.transactionId || newOrderId.replace('TNT', 'TXN'),
          customerName: formData.name,
          customerMobile: formData.mobile,
          ...(getItemTypes().includes('trip') && {
            preferredDay: formData.preferredDay,
            preferredTime: formData.timeSlot,
          }),
          paymentMethod: selectedPaymentMethod,
          amountPaid: getPayableAmount(),
          totalAmount: getTotalPrice(),
          isAdvancePayment,
          items: [...items], // Create a copy of items
          status: 'confirmed' as const,
          orderDate: new Date().toLocaleDateString('en-IN'),
          orderTime: new Date().toLocaleTimeString('en-IN'),
          comments: formData.comments
        };
        
        saveOrder(orderData);
        
        // Log complete order details
        console.log('Payment successful - Order details:', {
          orderId: newOrderId,
          transactionId: paymentResult.transactionId,
          items,
          totalAmount: getTotalPrice(),
          amountPaidNow: getPayableAmount(),
          amountDueAtCheckIn: Math.max(0, getTotalPrice() - getPayableAmount()),
          customerDetails: formData,
          paymentMethod: selectedPaymentMethod,
          paymentDetails: selectedPaymentMethod === 'Card' ? {
            cardNumber: paymentDetails.cardNumber.replace(/\d(?=\d{4})/g, "*"),
            expiryDate: paymentDetails.expiryDate,
            cardName: paymentDetails.cardName
          } : selectedPaymentMethod === 'UPI' ? {
            upiId: paymentDetails.upiId
          } : selectedPaymentMethod === 'NetBanking' ? {
            bankName: paymentDetails.bankName
          } : {},
          isAdvancePayment,
          gatewayResponse: paymentResult.gatewayResponse,
          timestamp: new Date().toISOString()
        });

        // Don't automatically clear cart - let user decide when to continue

      } else {
        setPaymentStep('failed');
        setPaymentError(paymentResult.gatewayResponse.errorMessage || 'Payment processing failed. Please try again or use a different payment method.');
      }
    } catch (error) {
      setPaymentStep('failed');
      setPaymentError('An unexpected error occurred. Please try again.');
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryPayment = () => {
    setPaymentStep('payment');
    setPaymentError('');
    setSelectedPaymentMethod('');
  };

  const handleBackToDetails = () => {
    setPaymentStep('details');
    setShowPayment(false);
    setPaymentError('');
  };

  const handleContinueShopping = () => {
    clearCart();
    router.push('/');
  };

  const handleViewReceipt = () => {
    // Keep user on success page, just show receipt details
    // Receipt is already displayed in the success screen
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getPayableAmount = () => {
    const total = getTotalPrice();
    if (isAdvancePayment) {
      const tenPercent = Math.round(total * 0.10);
      return Math.max(1, tenPercent);
    }
    return total;
  };

  const getItemTypes = () => {
    const types = items.map(item => item.type);
    const uniqueTypes = [...new Set(types)];
    return uniqueTypes;
  };

  const getDynamicText = () => {
    const itemTypes = getItemTypes();
    const total = getTotalPrice();
    const advanceAmount = Math.round(total * 0.10);
    const remainingAmount = Math.max(0, total - advanceAmount);
    
    if (itemTypes.length === 1) {
      const type = itemTypes[0];
      if (type === 'hotel') {
        return {
          title: '💡 Book your hotel by paying 10% advance',
          description: `Secure your hotel booking today by paying just ${formatPrice(advanceAmount)} (10% of total). The remaining ${formatPrice(remainingAmount)} will be due at check-in.`
        };
      } else if (type === 'taxi') {
        return {
          title: '💡 Book your ride by paying 10% advance',
          description: `Secure your taxi/ride booking today by paying just ${formatPrice(advanceAmount)} (10% of total). The remaining ${formatPrice(remainingAmount)} will be due at service time.`
        };
      } else if (type === 'trip') {
        return {
          title: '💡 Book your trip by paying 10% advance',
          description: `Secure your trip booking today by paying just ${formatPrice(advanceAmount)} (10% of total). The remaining ${formatPrice(remainingAmount)} will be due at check-in.`
        };
      }
    } else {
      return {
        title: '💡 Book your services by paying 10% advance',
        description: `Secure your bookings today by paying just ${formatPrice(advanceAmount)} (10% of total). The remaining ${formatPrice(remainingAmount)} will be due at check-in/service time.`
      };
    }
    
    return {
      title: '💡 Book by paying 10% advance',
      description: `Secure your booking today by paying just ${formatPrice(advanceAmount)} (10% of total). The remaining ${formatPrice(remainingAmount)} will be due at check-in.`
    };
  };

  if (!mounted) return null;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f5f5f5',
      paddingTop: '100px'
    }}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 300,
          color: '#1a1a1a',
          marginBottom: '0.5rem',
          fontFamily: 'serif'
        }}>
          Checkout
        </h1>
        
                 <p style={{
           color: '#666',
           marginBottom: '2rem'
         }}>
           Please fill in your details to complete the booking
         </p>

         {user && (
           <div style={{
             background: '#f0f9f6',
             border: '1px solid #d4ede8',
             borderRadius: '0.5rem',
             padding: '1rem',
             marginBottom: '2rem',
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem'
           }}>
             <span style={{ fontSize: '1.2rem' }}>✅</span>
             <div>
               <div style={{ fontWeight: 600, color: '#1e6f5c', fontSize: '0.95rem' }}>
                 Account Information Detected
               </div>
               <div style={{ color: '#666', fontSize: '0.85rem' }}>
                 Your name and mobile number have been pre-filled from your account. You can modify them if needed.
               </div>
             </div>
           </div>
         )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left: Form or Payment */}
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                     }}>
             {paymentStep === 'details' ? (
              <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333',
                  fontSize: '0.95rem'
                }}>
                  Full Name <span style={{ color: '#ff4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    color:'black',
                    backgroundColor:'white',
                    border: errors.name ? '2px solid #ff4444' : '2px solid #e0e0e0',
                    borderRadius: '0.4rem',
                    fontSize: '1rem',
                    transition: 'border 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = errors.name ? '#ff4444' : '#1e6f5c';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.name ? '#ff4444' : '#e0e0e0';
                  }}
                />
                {errors.name && (
                  <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Mobile Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333',
                  fontSize: '0.95rem'
                }}>
                  Mobile Number <span style={{ color: '#ff4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#666',
                    fontWeight: 500
                  }}>
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      paddingLeft: '3.5rem',
                      color:'black',
                      backgroundColor:'white',
                      border: errors.mobile ? '2px solid #ff4444' : '2px solid #e0e0e0',
                      borderRadius: '0.4rem',
                      fontSize: '1rem',
                      transition: 'border 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = errors.mobile ? '#ff4444' : '#1e6f5c';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.mobile ? '#ff4444' : '#e0e0e0';
                    }}
                  />
                </div>
                {errors.mobile && (
                  <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {errors.mobile}
                  </p>
                )}
              </div>

                             {/* Preferred Day and Time Selection - Only for customized trip plans */}
               {getItemTypes().includes('trip') && (
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={{
                     display: 'block',
                     marginBottom: '0.5rem',
                     fontWeight: 600,
                     color: '#333',
                     fontSize: '0.95rem'
                   }}>
                     Preferred Contact Day & Time <span style={{ color: '#ff4444' }}>*</span>
                   </label>
                 
                 <div style={{
                   display: 'grid',
                   gridTemplateColumns: '1fr 1fr',
                   gap: '1rem'
                 }}>
                   {/* Day Selection */}
                   <div>
                     <label style={{
                       display: 'block',
                       marginBottom: '0.5rem',
                       fontWeight: 500,
                       color: '#333',
                       fontSize: '0.9rem'
                     }}>
                       Preferred Day <span style={{ color: '#ff4444' }}>*</span>
                     </label>
                     <select
                       name="preferredDay"
                       value={formData.preferredDay}
                       onChange={handleInputChange}
                       style={{
                         width: '100%',
                         padding: '0.75rem',
                         border: errors.preferredDay ? '2px solid #ff4444' : '2px solid #e0e0e0',
                         borderRadius: '0.4rem',
                         fontSize: '1rem',
                         color: 'black',
                         background: '#fff',
                         cursor: 'pointer',
                         transition: 'border 0.2s',
                         outline: 'none'
                       }}
                       onFocus={(e) => {
                         e.currentTarget.style.borderColor = errors.preferredDay ? '#ff4444' : '#1e6f5c';
                       }}
                       onBlur={(e) => {
                         e.currentTarget.style.borderColor = errors.preferredDay ? '#ff4444' : '#e0e0e0';
                       }}
                     >
                       <option value="">Select day</option>
                       {daysOfWeek.map((day) => (
                         <option key={day.value} value={day.value}>
                           {day.label}
                         </option>
                       ))}
                     </select>
                     {errors.preferredDay && (
                       <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                         {errors.preferredDay}
                       </p>
                     )}
                   </div>

                   {/* Time Selection */}
                   <div>
                     <label style={{
                       display: 'block',
                       marginBottom: '0.5rem',
                       fontWeight: 500,
                       color: '#333',
                       fontSize: '0.9rem'
                     }}>
                       Preferred Time <span style={{ color: '#ff4444' }}>*</span>
                     </label>
                     <select
                       name="timeSlot"
                       value={formData.timeSlot}
                       onChange={handleInputChange}
                       style={{
                         width: '100%',
                         padding: '0.75rem',
                         border: errors.timeSlot ? '2px solid #ff4444' : '2px solid #e0e0e0',
                         borderRadius: '0.4rem',
                         fontSize: '1rem',
                         color: 'black',
                         background: '#fff',
                         cursor: 'pointer',
                         transition: 'border 0.2s',
                         outline: 'none'
                       }}
                       onFocus={(e) => {
                         e.currentTarget.style.borderColor = errors.timeSlot ? '#ff4444' : '#1e6f5c';
                       }}
                       onBlur={(e) => {
                         e.currentTarget.style.borderColor = errors.timeSlot ? '#ff4444' : '#e0e0e0';
                       }}
                     >
                       <option value="">Select time</option>
                       {timeSlots.map((slot) => (
                         <option key={slot.value} value={slot.value}>
                           {slot.label}
                         </option>
                       ))}
                     </select>
                     {errors.timeSlot && (
                       <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                         {errors.timeSlot}
                       </p>
                     )}
                   </div>
                 </div>

                 {/* Time Slot Description */}
                 {formData.timeSlot && (
                   <div style={{
                     marginTop: '0.5rem',
                     padding: '0.75rem',
                     background: '#f0f9f6',
                     border: '1px solid #d4ede8',
                     borderRadius: '0.4rem',
                     fontSize: '0.85rem',
                     color: '#1e6f5c'
                   }}>
                     <strong>Selected:</strong> {timeSlots.find(slot => slot.value === formData.timeSlot)?.label} 
                     {formData.preferredDay && formData.preferredDay !== 'any-day' && (
                       <span> on {daysOfWeek.find(day => day.value === formData.preferredDay)?.label}</span>
                     )}
                     {formData.preferredDay === 'any-day' && (
                       <span> on any day</span>
                     )}
                   </div>
                 )}
               </div>
               )}

              {/* Gender and Age Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {/* Gender Field */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#333',
                    fontSize: '0.95rem'
                  }}>
                    Gender <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.gender ? '2px solid #ff4444' : '2px solid #e0e0e0',
                      borderRadius: '0.4rem',
                      fontSize: '1rem',
                      color:'black',
                      background: '#fff',
                      cursor: 'pointer',
                      transition: 'border 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = errors.gender ? '#ff4444' : '#1e6f5c';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.gender ? '#ff4444' : '#e0e0e0';
                    }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Age Field */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#333',
                    fontSize: '0.95rem'
                  }}>
                    Age <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.age ? '2px solid #ff4444' : '2px solid #e0e0e0',
                      borderRadius: '0.4rem',
                      color:'black',
                      backgroundColor:'white',
                      fontSize: '1rem',
                      transition: 'border 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = errors.age ? '#ff4444' : '#1e6f5c';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.age ? '#ff4444' : '#e0e0e0';
                    }}
                  />
                  {errors.age && (
                    <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      {errors.age}
                    </p>
                  )}
                                 </div>
               </div>

               {/* Comments Field */}
               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={{
                   display: 'block',
                   marginBottom: '0.5rem',
                   fontWeight: 500,
                   color: '#333',
                   fontSize: '0.9rem'
                 }}>
                   Special Requests or Comments <span style={{ color: '#666', fontWeight: 350 }}>(Optional)</span>
                 </label>
                 <textarea
                   name="comments"
                   value={formData.comments}
                   onChange={handleInputChange}
                   placeholder="Any special requests, dietary preferences, accessibility needs, or additional information you'd like us to know..."
                   rows={4}
                   style={{
                     width: '100%',
                     padding: '0.75rem',
                     border: errors.comments ? '2px solid #ff4444' : '2px solid #e0e0e0',
                     borderRadius: '0.4rem',
                     fontSize: '1rem',
                     transition: 'border 0.2s',
                     outline: 'none',
                     resize: 'vertical',
                     fontFamily: 'inherit',
                     lineHeight: '1.4'
                   }}
                   onFocus={(e) => {
                     e.currentTarget.style.borderColor = errors.comments ? '#ff4444' : '#1e6f5c';
                   }}
                   onBlur={(e) => {
                     e.currentTarget.style.borderColor = errors.comments ? '#ff4444' : '#e0e0e0';
                   }}
                 />
                 {errors.comments && (
                   <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                     {errors.comments}
                   </p>
                 )}
                 <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.3' }}>
                   Help us provide you with the best possible service by sharing any specific requirements or preferences.
                 </p>
               </div>

               {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.4rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginTop: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Continue to Payment
                             </button>
             </form>
             ) : paymentStep === 'payment' ? (
              /* Payment Options */
              <div>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '1.5rem'
                }}>
                  Select Payment Method
                </h2>

                                 {/* 10% Advance Payment Option */}
                 <div style={{
                   marginBottom: '2rem',
                   padding: '1.5rem',
                   background: isAdvancePayment ? '#f0f9f9' : '#f8f9fa',
                   borderRadius: '0.5rem',
                   
                   cursor: 'pointer',
                   transition: 'all 0.2s'
                 }}
                 onClick={() => setIsAdvancePayment(!isAdvancePayment)}
                 >
                   <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                     
                     <div style={{ flex: 1 }}>
                       <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>
                         {getDynamicText().title}
                       </div>
                       <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.4' }}>
                         {getDynamicText().description}
                       </div>
                     </div>
                     <input
                       type="checkbox"
                       checked={isAdvancePayment}
                       onChange={() => setIsAdvancePayment(!isAdvancePayment)}
                       style={{
                         width: '20px',
                         height: '20px',
                         cursor: 'pointer',
                         marginTop: '0.1rem',

                       }}
                     />
                   </div>
                 </div>

                 <div style={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '1rem',
                   marginBottom: '2rem'
                 }}>
                  {/* UPI Payment */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5rem',
                    border: `2px solid ${selectedPaymentMethod === 'UPI' ? '#1e6f5c' : '#e0e0e0'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: selectedPaymentMethod === 'UPI' ? '#f0f9f6' : '#fff',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={selectedPaymentMethod === 'UPI'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      style={{
                        marginRight: '1rem',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.25rem' }}>
                        UPI Payment
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Pay using Google Pay, PhonePe, Paytm, or any UPI app
                      </div>
                    </div>
                    <span style={{ fontSize: '2rem' }}>📱</span>
                  </label>

                  {/* Credit/Debit Card */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5rem',
                    border: `2px solid ${selectedPaymentMethod === 'Card' ? '#1e6f5c' : '#e0e0e0'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: selectedPaymentMethod === 'Card' ? '#f0f9f6' : '#fff',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={selectedPaymentMethod === 'Card'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      style={{
                        marginRight: '1rem',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.25rem' }}>
                        Credit/Debit Card
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        All major cards accepted
                      </div>
                    </div>
                    <span style={{ fontSize: '2rem' }}>💳</span>
                  </label>

                  {/* Net Banking */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5rem',
                    border: `2px solid ${selectedPaymentMethod === 'NetBanking' ? '#1e6f5c' : '#e0e0e0'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: selectedPaymentMethod === 'NetBanking' ? '#f0f9f6' : '#fff',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value="NetBanking"
                      checked={selectedPaymentMethod === 'NetBanking'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      style={{
                        marginRight: '1rem',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.25rem' }}>
                        Net Banking
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        All major banks supported
                      </div>
                    </div>
                    <span style={{ fontSize: '2rem' }}>🏦</span>
                  </label>

                                     {/* Pay at Check-in - Only for hotels */}
                   {getItemTypes().includes('hotel') && (
                     <label style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '1.5rem',
                       border: `2px solid ${selectedPaymentMethod === 'COD' ? '#1e6f5c' : '#e0e0e0'}`,
                       borderRadius: '0.5rem',
                       cursor: 'pointer',
                       background: selectedPaymentMethod === 'COD' ? '#f0f9f6' : '#fff',
                       transition: 'all 0.2s'
                     }}>
                       <input
                         type="radio"
                         name="payment"
                         value="COD"
                         checked={selectedPaymentMethod === 'COD'}
                         onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                         style={{
                           marginRight: '1rem',
                           width: '20px',
                           height: '20px',
                           cursor: 'pointer'
                         }}
                       />
                       <div style={{ flex: 1 }}>
                         <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.25rem' }}>
                           Pay at Check-in
                         </div>
                         <div style={{ fontSize: '0.9rem', color: '#666' }}>
                           Pay when you check into your hotel
                         </div>
                       </div>
                       <span style={{ fontSize: '2rem' }}>🏨</span>
                     </label>
                   )}
                </div>

                                 {/* Payment Details Forms */}
                 {selectedPaymentMethod === 'Card' && (
                   <div style={{
                     background: '#f8f9fa',
                     border: '1px solid #e0e0e0',
                     borderRadius: '0.5rem',
                     padding: '1.5rem',
                     marginBottom: '1.5rem'
                   }}>
                     <h3 style={{
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       color: '#333',
                       marginBottom: '1rem'
                     }}>
                       Card Details
                     </h3>
                     
                     <div style={{ marginBottom: '1rem' }}>
                       <label style={{
                         display: 'block',
                         marginBottom: '0.5rem',
                         fontWeight: 500,
                         color: '#333',
                         fontSize: '0.9rem'
                       }}>
                         Card Number <span style={{ color: '#ff4444' }}>*</span>
                       </label>
                       <input
                         type="text"
                         name="cardNumber"
                         value={paymentDetails.cardNumber}
                         onChange={handlePaymentInputChange}
                         placeholder="1234 5678 9012 3456"
                         maxLength={19}
                         style={{
                           width: '100%',
                           padding: '0.75rem',
                           border: paymentValidationErrors.cardNumber ? '2px solid #ff4444' : '2px solid #e0e0e0',
                           borderRadius: '0.4rem',
                           fontSize: '1rem',
                           transition: 'border 0.2s',
                           outline: 'none'
                         }}
                         onFocus={(e) => {
                           e.currentTarget.style.borderColor = paymentValidationErrors.cardNumber ? '#ff4444' : '#1e6f5c';
                         }}
                         onBlur={(e) => {
                           e.currentTarget.style.borderColor = paymentValidationErrors.cardNumber ? '#ff4444' : '#e0e0e0';
                         }}
                       />
                       {paymentValidationErrors.cardNumber && (
                         <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                           {paymentValidationErrors.cardNumber}
                         </p>
                       )}
                     </div>

                     <div style={{
                       display: 'grid',
                       gridTemplateColumns: '1fr 1fr',
                       gap: '1rem',
                       marginBottom: '1rem'
                     }}>
                       <div>
                         <label style={{
                           display: 'block',
                           marginBottom: '0.5rem',
                           fontWeight: 500,
                           color: '#333',
                           fontSize: '0.9rem'
                         }}>
                           Expiry Date <span style={{ color: '#ff4444' }}>*</span>
                         </label>
                         <input
                           type="text"
                           name="expiryDate"
                           value={paymentDetails.expiryDate}
                           onChange={handlePaymentInputChange}
                           placeholder="MM/YY"
                           maxLength={5}
                           style={{
                             width: '100%',
                             padding: '0.75rem',
                             border: paymentValidationErrors.expiryDate ? '2px solid #ff4444' : '2px solid #e0e0e0',
                             borderRadius: '0.4rem',
                             fontSize: '1rem',
                             transition: 'border 0.2s',
                             outline: 'none'
                           }}
                         />
                         {paymentValidationErrors.expiryDate && (
                           <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                             {paymentValidationErrors.expiryDate}
                           </p>
                         )}
                       </div>

                       <div>
                         <label style={{
                           display: 'block',
                           marginBottom: '0.5rem',
                           fontWeight: 500,
                           color: '#333',
                           fontSize: '0.9rem'
                         }}>
                           CVV <span style={{ color: '#ff4444' }}>*</span>
                         </label>
                         <input
                           type="text"
                           name="cvv"
                           value={paymentDetails.cvv}
                           onChange={handlePaymentInputChange}
                           placeholder="123"
                           maxLength={4}
                           style={{
                             width: '100%',
                             padding: '0.75rem',
                             border: paymentValidationErrors.cvv ? '2px solid #ff4444' : '2px solid #e0e0e0',
                             borderRadius: '0.4rem',
                             fontSize: '1rem',
                             transition: 'border 0.2s',
                             outline: 'none'
                           }}
                         />
                         {paymentValidationErrors.cvv && (
                           <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                             {paymentValidationErrors.cvv}
                           </p>
                         )}
                       </div>
                     </div>

                     <div>
                       <label style={{
                         display: 'block',
                         marginBottom: '0.5rem',
                         fontWeight: 500,
                         color: '#333',
                         fontSize: '0.9rem'
                       }}>
                         Cardholder Name <span style={{ color: '#ff4444' }}>*</span>
                       </label>
                       <input
                         type="text"
                         name="cardName"
                         value={paymentDetails.cardName}
                         onChange={handlePaymentInputChange}
                         placeholder="Enter cardholder name"
                         style={{
                           width: '100%',
                           padding: '0.75rem',
                           border: paymentValidationErrors.cardName ? '2px solid #ff4444' : '2px solid #e0e0e0',
                           borderRadius: '0.4rem',
                           fontSize: '1rem',
                           transition: 'border 0.2s',
                           outline: 'none'
                         }}
                       />
                       {paymentValidationErrors.cardName && (
                         <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                           {paymentValidationErrors.cardName}
                         </p>
                       )}
                     </div>
                   </div>
                 )}

                 {selectedPaymentMethod === 'UPI' && (
                   <div style={{
                     background: '#f8f9fa',
                     border: '1px solid #e0e0e0',
                     borderRadius: '0.5rem',
                     padding: '1.5rem',
                     marginBottom: '1.5rem'
                   }}>
                     <h3 style={{
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       color: '#333',
                       marginBottom: '1rem'
                     }}>
                       UPI Details
                     </h3>
                     
                     <div>
                       <label style={{
                         display: 'block',
                         marginBottom: '0.5rem',
                         fontWeight: 500,
                         color: '#333',
                         fontSize: '0.9rem'
                       }}>
                         UPI ID <span style={{ color: '#ff4444' }}>*</span>
                       </label>
                       <input
                         type="text"
                         name="upiId"
                         value={paymentDetails.upiId}
                         onChange={handlePaymentInputChange}
                         placeholder="yourname@paytm or yourname@phonepe"
                         style={{
                           width: '100%',
                           padding: '0.75rem',
                           border: paymentValidationErrors.upiId ? '2px solid #ff4444' : '2px solid #e0e0e0',
                           borderRadius: '0.4rem',
                           fontSize: '1rem',
                           transition: 'border 0.2s',
                           outline: 'none'
                         }}
                       />
                       {paymentValidationErrors.upiId && (
                         <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                           {paymentValidationErrors.upiId}
                         </p>
                       )}
                       <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                         You'll be redirected to your UPI app to complete the payment
                       </p>
                     </div>
                   </div>
                 )}

                 {selectedPaymentMethod === 'NetBanking' && (
                   <div style={{
                     background: '#f8f9fa',
                     border: '1px solid #e0e0e0',
                     borderRadius: '0.5rem',
                     padding: '1.5rem',
                     marginBottom: '1.5rem'
                   }}>
                     <h3 style={{
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       color: '#333',
                       marginBottom: '1rem'
                     }}>
                       Bank Selection
                     </h3>
                     
                     <div>
                       <label style={{
                         display: 'block',
                         marginBottom: '0.5rem',
                         fontWeight: 500,
                         color: '#333',
                         fontSize: '0.9rem'
                       }}>
                         Select Bank <span style={{ color: '#ff4444' }}>*</span>
                       </label>
                       <select
                         name="bankName"
                         value={paymentDetails.bankName}
                         onChange={handlePaymentInputChange}
                         style={{
                           width: '100%',
                           padding: '0.75rem',
                           border: paymentValidationErrors.bankName ? '2px solid #ff4444' : '2px solid #e0e0e0',
                           borderRadius: '0.4rem',
                           fontSize: '1rem',
                           background: '#fff',
                           cursor: 'pointer',
                           transition: 'border 0.2s',
                           outline: 'none'
                         }}
                       >
                         <option value="">Select your bank</option>
                         <option value="SBI">State Bank of India</option>
                         <option value="HDFC">HDFC Bank</option>
                         <option value="ICICI">ICICI Bank</option>
                         <option value="Axis">Axis Bank</option>
                         <option value="Kotak">Kotak Mahindra Bank</option>
                         <option value="PNB">Punjab National Bank</option>
                         <option value="BOI">Bank of India</option>
                         <option value="Canara">Canara Bank</option>
                         <option value="Union">Union Bank of India</option>
                         <option value="Bank of Baroda">Bank of Baroda</option>
                       </select>
                       {paymentValidationErrors.bankName && (
                         <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                           {paymentValidationErrors.bankName}
                         </p>
                       )}
                       <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                         You'll be redirected to your bank's net banking portal
                       </p>
                     </div>
                   </div>
                 )}

                 {/* Payment Error Display */}
                 {paymentError && (
                   <div style={{
                     background: '#ffebee',
                     border: '1px solid #ffcdd2',
                     borderRadius: '0.4rem',
                     padding: '1rem',
                     marginBottom: '1rem',
                     color: '#d32f2f',
                     fontSize: '0.9rem'
                   }}>
                     {paymentError}
                   </div>
                 )}

                 {/* Action Buttons */}
                 <div style={{
                   display: 'flex',
                   gap: '1rem'
                 }}>
                   <button
                     type="button"
                     onClick={handleBackToDetails}
                     style={{
                       flex: 1,
                       padding: '1rem',
                       background: '#fff',
                       color: '#666',
                       border: '2px solid #e0e0e0',
                       borderRadius: '0.4rem',
                       fontSize: '1rem',
                       fontWeight: 600,
                       cursor: 'pointer',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = '#999';
                       e.currentTarget.style.color = '#333';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = '#e0e0e0';
                       e.currentTarget.style.color = '#666';
                     }}
                   >
                     Back to Details
                   </button>
                   
                   <button
                     type="button"
                     onClick={handlePayment}
                     disabled={isProcessing}
                     style={{
                       flex: 2,
                       padding: '1rem',
                       background: isProcessing ? '#666' : '#000',
                       color: '#fff',
                       border: 'none',
                       borderRadius: '0.4rem',
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       cursor: isProcessing ? 'not-allowed' : 'pointer',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       if (!isProcessing) {
                         e.currentTarget.style.background = '#333';
                         e.currentTarget.style.transform = 'translateY(-1px)';
                       }
                     }}
                     onMouseLeave={(e) => {
                       if (!isProcessing) {
                         e.currentTarget.style.background = '#000';
                         e.currentTarget.style.transform = 'translateY(0)';
                       }
                     }}
                   >
                     {isProcessing 
                       ? 'Processing Payment...'
                       : isAdvancePayment
                         ? `Pay ${formatPrice(getPayableAmount())} (10% advance)`
                         : `Pay ${formatPrice(getPayableAmount())} (Full amount)`}
                   </button>
                 </div>
               </div>
             ) : paymentStep === 'processing' ? (
               /* Payment Processing Screen */
               <div style={{
                 textAlign: 'center',
                 padding: '3rem 2rem'
               }}>
                 <div style={{
                   width: '80px',
                   height: '80px',
                   border: '4px solid #f3f3f3',
                   borderTop: '4px solid #1e6f5c',
                   borderRadius: '50%',
                   animation: 'spin 1s linear infinite',
                   margin: '0 auto 2rem'
                 }} />
                 <h2 style={{
                   fontSize: '1.8rem',
                   fontWeight: 600,
                   color: '#1a1a1a',
                   marginBottom: '1rem'
                 }}>
                   Processing Your Payment
                 </h2>
                 <p style={{
                   color: '#666',
                   fontSize: '1rem',
                   marginBottom: '1.5rem'
                 }}>
                   Please wait while we process your payment. Do not close this window.
                 </p>
                 <div style={{
                   background: '#f8f9fa',
                   borderRadius: '0.5rem',
                   padding: '1rem',
                   fontSize: '0.9rem',
                   color: '#666'
                 }}>
                   <div style={{ marginBottom: '0.5rem' }}>
                     <strong>Order ID:</strong> {orderId}
                   </div>
                   <div style={{ marginBottom: '0.5rem' }}>
                     <strong>Amount:</strong> {formatPrice(getPayableAmount())}
                   </div>
                   <div>
                     <strong>Method:</strong> {selectedPaymentMethod}
                   </div>
                 </div>
               </div>
             ) : paymentStep === 'success' ? (
               /* Payment Success Screen */
               <div style={{
                 textAlign: 'center',
                 padding: '3rem 2rem'
               }}>
                 <div style={{
                   width: '80px',
                   height: '80px',
                   background: '#1e6f5c',
                   borderRadius: '50%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   margin: '0 auto 2rem',
                   fontSize: '2.5rem',
                   color: '#fff'
                 }}>
                   ✓
                 </div>
                 <h2 style={{
                   fontSize: '1.8rem',
                   fontWeight: 600,
                   color: '#1a1a1a',
                   marginBottom: '1rem'
                 }}>
                   Payment Successful!
                 </h2>
                 <p style={{
                   color: '#666',
                   fontSize: '1rem',
                   marginBottom: '2rem',
                   lineHeight: '1.5'
                 }}>
                   Thank you, {formData.name}! Your booking has been confirmed.
                   {isAdvancePayment 
                     ? ` We received ${formatPrice(getPayableAmount())} (10% advance). Remaining ${formatPrice(Math.max(0, getTotalPrice() - getPayableAmount()))} is due at check-in.`
                     : ` Payment of ${formatPrice(getPayableAmount())} via ${selectedPaymentMethod} was successful.`
                   }
                 </p>
                 <div style={{
                   background: '#f0f9f6',
                   border: '1px solid #d4ede8',
                   borderRadius: '0.5rem',
                   padding: '1.5rem',
                   marginBottom: '2rem',
                   textAlign: 'left'
                 }}>
                   <h3 style={{
                     fontSize: '1.1rem',
                     fontWeight: 600,
                     color: '#1e6f5c',
                     marginBottom: '1rem'
                   }}>
                     Payment Receipt
                   </h3>
                   <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Order ID:</strong> {orderId}
                     </div>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Transaction ID:</strong> {orderId.replace('TNT', 'TXN')}
                     </div>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Payment Method:</strong> {selectedPaymentMethod}
                     </div>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Amount Paid:</strong> {formatPrice(getPayableAmount())}
                     </div>
                     {isAdvancePayment && (
                       <div style={{ marginBottom: '0.5rem' }}>
                         <strong>Due at Check-in:</strong> {formatPrice(Math.max(0, getTotalPrice() - getPayableAmount()))}
                       </div>
                     )}
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Payment Status:</strong> <span style={{ color: '#2e7d32', fontWeight: 600 }}>✅ Successful</span>
                     </div>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}
                     </div>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Time:</strong> {new Date().toLocaleTimeString('en-IN')}
                     </div>
                   </div>
                 </div>

                 <div style={{
                   background: '#f8f9fa',
                   border: '1px solid #e0e0e0',
                   borderRadius: '0.5rem',
                   padding: '1.5rem',
                   marginBottom: '2rem',
                   textAlign: 'left'
                 }}>
                   <h3 style={{
                     fontSize: '1.1rem',
                     fontWeight: 600,
                     color: '#333',
                     marginBottom: '1rem'
                   }}>
                     Booking Details
                   </h3>
                   <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Customer:</strong> {formData.name}
                     </div>
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Contact:</strong> {formData.mobile}
                     </div>
                     {getItemTypes().includes('trip') && (
                       <>
                         <div style={{ marginBottom: '0.5rem' }}>
                           <strong>Preferred Day:</strong> {formData.preferredDay === 'any-day' ? 'Any Day' : daysOfWeek.find(day => day.value === formData.preferredDay)?.label}
                         </div>
                         <div style={{ marginBottom: '0.5rem' }}>
                           <strong>Preferred Time:</strong> {timeSlots.find(slot => slot.value === formData.timeSlot)?.label}
                         </div>
                       </>
                     )}
                     <div style={{ marginBottom: '0.5rem' }}>
                       <strong>Items Booked:</strong> {items.length} item(s)
                     </div>
                     {formData.comments && (
                       <div>
                         <strong>Special Requests:</strong> {formData.comments}
                       </div>
                     )}
                   </div>
                 </div>
                 {getItemTypes().includes('trip') && (
                   <p style={{
                     color: '#1e6f5c',
                     fontSize: '0.9rem',
                     marginBottom: '1rem',
                     fontWeight: 500
                   }}>
                     Our team will contact you on {formData.preferredDay === 'any-day' ? 'any day' : daysOfWeek.find(day => day.value === formData.preferredDay)?.label} 
                     at {timeSlots.find(slot => slot.value === formData.timeSlot)?.label} to confirm your booking and provide further details.
                   </p>
                 )}

                 <div style={{
                   background: '#e8f5e8',
                   border: '1px solid #c8e6c9',
                   borderRadius: '0.5rem',
                   padding: '1rem',
                   marginBottom: '2rem',
                   textAlign: 'center'
                 }}>
                   <p style={{
                     fontSize: '0.9rem',
                     color: '#2e7d32',
                     margin: 0,
                     fontWeight: 500
                   }}>
                     ✅ Your booking is confirmed! You can stay on this page to review your details or continue shopping when ready.
                   </p>
                 </div>
                 <div style={{
                   display: 'flex',
                   gap: '1rem'
                 }}>
                   <button
                     onClick={() => {
                       // Generate and download receipt
                       const receiptData = {
                         orderId,
                         transactionId: orderId.replace('TNT', 'TXN'),
                         customerName: formData.name,
                         customerMobile: formData.mobile,
                         ...(getItemTypes().includes('trip') && {
                           preferredDay: formData.preferredDay === 'any-day' ? 'Any Day' : daysOfWeek.find(day => day.value === formData.preferredDay)?.label,
                           preferredTime: timeSlots.find(slot => slot.value === formData.timeSlot)?.label,
                         }),
                         paymentMethod: selectedPaymentMethod,
                         amountPaid: getPayableAmount(),
                         totalAmount: getTotalPrice(),
                         isAdvancePayment,
                         items: items.map(item => ({ name: item.name, price: item.price })),
                         date: new Date().toLocaleDateString('en-IN'),
                         time: new Date().toLocaleTimeString('en-IN')
                       };
                       
                       const receiptText = `
TNT TRAVELS - PAYMENT RECEIPT
================================

Order ID: ${receiptData.orderId}
Transaction ID: ${receiptData.transactionId}
Date: ${receiptData.date}
Time: ${receiptData.time}

Customer Details:
Name: ${receiptData.customerName}
Mobile: ${receiptData.customerMobile}${receiptData.preferredDay ? `
Preferred Contact: ${receiptData.preferredDay} at ${receiptData.preferredTime}` : ''}

Payment Details:
Method: ${receiptData.paymentMethod}
Amount Paid: ₹${receiptData.amountPaid}
${receiptData.isAdvancePayment ? `Total Amount: ₹${receiptData.totalAmount}` : ''}
${receiptData.isAdvancePayment ? `Due at Check-in: ₹${receiptData.totalAmount - receiptData.amountPaid}` : ''}

Items Booked:
${receiptData.items.map(item => `- ${item.name}: ₹${item.price}`).join('\n')}

Status: Payment Successful ✅

Thank you for choosing TNT Travels!
                       `;
                       
                       const blob = new Blob([receiptText], { type: 'text/plain' });
                       const url = window.URL.createObjectURL(blob);
                       const a = document.createElement('a');
                       a.href = url;
                       a.download = `TNT-Receipt-${orderId}.txt`;
                       document.body.appendChild(a);
                       a.click();
                       document.body.removeChild(a);
                       window.URL.revokeObjectURL(url);
                     }}
                     style={{
                       flex: 1,
                       padding: '1rem',
                       background: '#fff',
                       color: '#1e6f5c',
                       border: '2px solid #1e6f5c',
                       borderRadius: '0.4rem',
                       fontSize: '1rem',
                       fontWeight: 600,
                       cursor: 'pointer',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = '#1e6f5c';
                       e.currentTarget.style.color = '#fff';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = '#fff';
                       e.currentTarget.style.color = '#1e6f5c';
                     }}
                   >
                     📄 Download Receipt
                   </button>
                   
                   <button
                     onClick={handleContinueShopping}
                     style={{
                       flex: 1,
                       padding: '1rem',
                       background: '#1e6f5c',
                       color: '#fff',
                       border: 'none',
                       borderRadius: '0.4rem',
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       cursor: 'pointer',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = '#1a5a4a';
                       e.currentTarget.style.transform = 'translateY(-1px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = '#1e6f5c';
                       e.currentTarget.style.transform = 'translateY(0)';
                     }}
                   >
                     Continue
                   </button>
                 </div>
               </div>
             ) : paymentStep === 'failed' ? (
               /* Payment Failed Screen */
               <div style={{
                 textAlign: 'center',
                 padding: '3rem 2rem'
               }}>
                 <div style={{
                   width: '80px',
                   height: '80px',
                   background: '#d32f2f',
                   borderRadius: '50%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   margin: '0 auto 2rem',
                   fontSize: '2.5rem',
                   color: '#fff'
                 }}>
                   ✗
                 </div>
                 <h2 style={{
                   fontSize: '1.8rem',
                   fontWeight: 600,
                   color: '#1a1a1a',
                   marginBottom: '1rem'
                 }}>
                   Payment Failed
                 </h2>
                 <p style={{
                   color: '#666',
                   fontSize: '1rem',
                   marginBottom: '2rem',
                   lineHeight: '1.5'
                 }}>
                   {paymentError || 'We encountered an issue processing your payment. Please try again.'}
                 </p>
                 <div style={{
                   background: '#ffebee',
                   border: '1px solid #ffcdd2',
                   borderRadius: '0.5rem',
                   padding: '1.5rem',
                   marginBottom: '2rem',
                   textAlign: 'left'
                 }}>
                   <h3 style={{
                     fontSize: '1.1rem',
                     fontWeight: 600,
                     color: '#d32f2f',
                     marginBottom: '1rem'
                   }}>
                     What you can do:
                   </h3>
                   <ul style={{
                     fontSize: '0.9rem',
                     color: '#666',
                     lineHeight: '1.6',
                     paddingLeft: '1.5rem',
                     margin: 0
                   }}>
                     <li>Check your payment method details</li>
                     <li>Ensure sufficient funds are available</li>
                     <li>Try a different payment method</li>
                     <li>Contact your bank if the issue persists</li>
                   </ul>
                 </div>
                 <div style={{
                   display: 'flex',
                   gap: '1rem'
                 }}>
                   <button
                     onClick={handleRetryPayment}
                     style={{
                       flex: 1,
                       padding: '1rem',
                       background: '#1e6f5c',
                       color: '#fff',
                       border: 'none',
                       borderRadius: '0.4rem',
                       fontSize: '1rem',
                       fontWeight: 600,
                       cursor: 'pointer',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = '#1a5a4a';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = '#1e6f5c';
                     }}
                   >
                     Try Again
                   </button>
                   <button
                     onClick={handleBackToDetails}
                     style={{
                       flex: 1,
                       padding: '1rem',
                       background: '#fff',
                       color: '#666',
                       border: '2px solid #e0e0e0',
                       borderRadius: '0.4rem',
                       fontSize: '1rem',
                       fontWeight: 600,
                       cursor: 'pointer',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = '#999';
                       e.currentTarget.style.color = '#333';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = '#e0e0e0';
                       e.currentTarget.style.color = '#666';
                     }}
                   >
                     Back to Details
                   </button>
                 </div>
               </div>
             ) : null}
          </div>

          {/* Right: Order Summary */}
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '120px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: '1rem'
            }}>
              {paymentStep === 'success' ? 'Booking Confirmed' : 
               paymentStep === 'processing' ? 'Processing Order' :
               paymentStep === 'failed' ? 'Order Details' : 'Order Summary'}
            </h3>

            <div style={{
              borderBottom: '1px solid #e0e0e0',
              paddingBottom: '1rem',
              marginBottom: '1rem'
            }}>
              {items.map((item, index) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: index < items.length - 1 ? '0.75rem' : 0,
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: '#666', flex: 1, paddingRight: '1rem' }}>
                    {item.name}
                  </span>
                  <span style={{ color: '#1a1a1a', fontWeight: 500 }}>
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>

                         <div style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               fontSize: '1.1rem',
               fontWeight: 600,
               color: '#1a1a1a',
               marginBottom: isAdvancePayment ? '0.5rem' : 0
             }}>
               <span>Total Amount</span>
               <span style={{ color: '#1e6f5c', fontSize: '1.3rem' }}>
                 {formatPrice(getTotalPrice())}
               </span>
             </div>

             {isAdvancePayment && (
               <div style={{
                 fontSize: '0.95rem',
                 color: '#333',
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '0.25rem',
                 marginTop: '0.5rem'
               }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <span>Pay now (10% advance)</span>
                   <span style={{ color: '#1e6f5c', fontWeight: 600 }}>{formatPrice(getPayableAmount())}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                   <span>Due at check-in</span>
                   <span style={{ fontWeight: 600 }}>{formatPrice(Math.max(0, getTotalPrice() - getPayableAmount()))}</span>
                 </div>
               </div>
             )}

            {paymentStep === 'success' && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#e8f5e8',
                borderRadius: '0.4rem',
                border: '1px solid #c8e6c9'
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#2e7d32',
                  margin: 0,
                  lineHeight: 1.5,
                  fontWeight: 500
                }}>
                  ✅ Your booking is confirmed! We'll contact you soon.
                </p>
              </div>
            )}

            {paymentStep !== 'success' && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#f0f9f6',
                borderRadius: '0.4rem',
                border: '1px solid #d4ede8'
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#1e6f5c',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  <strong>Note:</strong> Our team will contact you at your preferred time slot to confirm your booking and provide further details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
