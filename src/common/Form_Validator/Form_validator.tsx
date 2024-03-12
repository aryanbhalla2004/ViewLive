export const validateBusinessName = (name: string): boolean => {
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(name);
}

export const validateName = (firstName: string): boolean => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(firstName);
}

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const validateAddress = (address: any): boolean => {
  const regex = /^[a-zA-Z0-9\s,'-]+$/;
  const { address: addr, unit, city, state, country, postalCode } = address;
  return regex.test(addr) && regex.test(unit) && regex.test(city) && regex.test(state) && regex.test(country) && /^[0-9]{5}(?:-[0-9]{4})?$/.test(postalCode);
}

export const isWorkEmail = (email: string): boolean => {
  const workEmailProviders = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'aol.com',
    'zoho.com',
    'protonmail.com',
    'fastmail.com',
    'gmx.com',
    'tutanota.com',
    'yandex.com',
    'mail.com',
    'icloud.com',
    'hushmail.com',
    'mailinator.com',
    'guerrillamail.com',
  ];

  const emailDomain = email.split('@')[1];

  return !workEmailProviders.includes(emailDomain);
}

export const isOlderEnough = (birthDate: string) : boolean => {
  const dob = new Date(birthDate);
  const today = new Date();
  let ageInYears : any = today.getFullYear() - dob.getFullYear();
  const birthMonth = dob.getMonth();
  const todayMonth = today.getMonth();
  if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < dob.getDate())) {
    ageInYears--;
  }
  return ageInYears >= 14;
}

export const isValidURL = (url: any): boolean => {
  if(url != undefined) {
    var pattern = /^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(url);
  } 

  return false;
  
}