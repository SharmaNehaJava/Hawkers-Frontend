import React, { useState } from 'react';
import AccountCreation from './AccountCreation';
import BusinessDetails from './BusinessDetails';
import BrandDetails from './BrandDetails';
import BankDetails from './BankDetails';
import ShippingLocations from './ShippingLocations';
import DigitalSignature from './DigitalSignature';
import ReviewSubmit from './ReviewSubmit';

const VendorRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    contactName: '',
    contactPhone: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    brandDetails: {
      productCategories: [],
      otherDetails: '',
    },
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
    },
    shippingLocations: [],
    digitalSignature: '',
  });

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return <AccountCreation onNext={handleNextStep} />;
    case 2:
      return <BusinessDetails onNext={handleNextStep} onPrevious={handlePreviousStep} />;
    case 3:
      return <BrandDetails onNext={handleNextStep} onPrevious={handlePreviousStep} />;
    case 4:
      return <BankDetails onNext={handleNextStep} onPrevious={handlePreviousStep} />;
    case 5:
      return <ShippingLocations onNext={handleNextStep} onPrevious={handlePreviousStep} />;
    case 6:
      return <DigitalSignature onNext={handleNextStep} onPrevious={handlePreviousStep} />;
    case 7:
      return <ReviewSubmit data={formData} onPrevious={handlePreviousStep} />;
    default:
      return <AccountCreation onNext={handleNextStep} />;
  }
};

export default VendorRegistrationForm;
