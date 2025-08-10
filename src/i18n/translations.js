// Keep keys short and consistent across the app
export const translations = {
  en: {
    appTitle: "GSMB Mining Verification",
    nav: { public: "Public", login: "Login", police: "Police", gsmb: "GSMB", owner: "Owner" },
    lang: { label: "Language", en: "English", si: "සිංහල", ta: "தமிழ்" },

    public: {
      title: "Public Portal",
      platePlaceholder: "Enter lorry number (e.g., SP-1234)",
      verify: "Verify",
      noLicense: "No license found for",
      reportTitle: "Report a Suspicion",
      location: "Location",
      noteOptional: "Note (optional)",
      submitReport: "Submit Report",
      thanksReport: "Thanks! Your report ID is",
      finesTitle: "Find Fines (for payment reference)",
      searchByPlate: "Search by plate",
      amount: "Amount",
      status: "Status",
      hintPay: "To pay a fine, log in as owner or visit GSMB to process.",
      licensesTitle: "All Licenses (demo)",
      validWindow: "License Window",
      todayValid: "(Valid today)",
      todayInvalid: "(Not valid today)"
    },

    login: {
      title: "Sign in",
      username: "username",
      password: "password",
      loginBtn: "Login",
      demo: "Demo Accounts",
      police: "Police",
      gsmb: "GSMB",
      owner: "Owner",
      invalidCreds: "Invalid credentials"
    },

    police: {
      title: "Police Dashboard",
      incoming: "Incoming Reports",
      id: "ID",
      plate: "Plate",
      note: "Note",
      actions: "Actions",
      valid: "Valid",
      reject: "Reject",
      fineSuspend: "Fine & Suspend",
      licenses: "Licenses",
      amount: "Amount",
      autoSuspend: "Issuing a fine automatically suspends the related license."
    },

    gsmb: {
      title: "GSMB Dashboard",
      fines: "Fines",
      filter: "Filter",
      all: "All",
      paid: "Paid",
      unpaid: "Unpaid",
      ref: "Reference",
      reactivate: "Reactivate License",
      onlyPaidReactivate: "Only paid fines for suspended plates can be reactivated.",
      licenses: "Licenses"
    },

    owner: {
      title: "Owner Dashboard",
      myLicenses: "My Licenses",
      plate: "Plate",
      from: "From",
      to: "To",
      status: "Status",
      myFines: "My Fines",
      fineId: "Fine ID",
      amount: "Amount",
      ref: "Ref",
      action: "Action",
      payViaLP: "Pay via LankaPay",
      markPaid: "Mark Paid",
      enterFineId: "Enter Fine ID to pay",
      receipt: "Payment recorded. Ref",
    },

    payment: {
      payTitle: "Pay via LankaPay",
      payingFor: "You are paying fine",
      forPlate: "for plate",
      willReturn: "Will return to",
      proceed: "Proceed to LankaPay",
      simulateFail: "Simulate Fail",
      openSandbox: "Open Sandbox URL",
      note: "Replace the simulation with real redirect once you have LankaPay details.",
      resultTitle: "Payment Result",
      txn: "Transaction",
      redirecting: "Updating your fines… You’ll be redirected to Owner Dashboard.",
      notFound: "Fine not found. Go back to Owner Dashboard."
    }
  },

  si: {
    appTitle: "ජීඑස්එම්බී (GSMB) සහතික සත්‍යාපන",
    nav: { public: "ප්‍රජා", login: "ඇතුල් වන්න", police: "පොලිස්", gsmb: "GSMB", owner: "අයිතිකරු" },
    lang: { label: "භාෂාව", en: "English", si: "සිංහල", ta: "தமிழ்" },

    public: {
      title: "ප්‍රජා ද්වාරය",
      platePlaceholder: "ලොරි අංකය ඇතුල් කරන්න (උදා: SP-1234)",
      verify: "පරීක්ෂා කරන්න",
      noLicense: "සහතිකයක් නොමැත",
      reportTitle: "සංශයිත ලොරි පිළිබඳ වාර්තාවක්",
      location: "ස්ථානය",
      noteOptional: "සටහන (විකල්ප)",
      submitReport: "වාර්තාව යවන්න",
      thanksReport: "ඔබට ස්තූතියි! ඔබගේ වාර්තා අංකය",
      finesTitle: "දඩ සොයන්න (ගෙවීමට)",
      searchByPlate: "පලට් අනුව සොයන්න",
      amount: "ගෙවිය යුතු මුදල",
      status: "තත්වය",
      hintPay: "දඩය ගෙවීමට අයිතිකරු ලෙස login වෙන්න හෝ GSMB වෙත පැමිණෙන්න.",
      licensesTitle: "සියලු සහතික (උදාහරණයි)",
      validWindow: "වලංගු කාලය",
      todayValid: "(අදට වලංගුයි)",
      todayInvalid: "(අදට වලංගු නොවේ)"
    },

    login: {
      title: "ඇතුල් වන්න",
      username: "පරිශීලක නාමය",
      password: "මුරපදය",
      loginBtn: "ඇතුල් වන්න",
      demo: "උදාහරණ ගිණුම්",
      police: "පොලිස්",
      gsmb: "GSMB",
      owner: "අයිතිකරු",
      invalidCreds: "අවලංගු හඳුන්වීම්"
    },

    police: {
      title: "පොලිස් පුවරුව",
      incoming: "ලැබෙන වාර්තා",
      id: "අංකය",
      plate: "ලොරි අංකය",
      note: "සටහන",
      actions: "ක්‍රියාමාර්ග",
      valid: "වලංගුයි",
      reject: "ප්‍රතික්ෂේප",
      fineSuspend: "දඩ හා අත්හිටුවීම",
      licenses: "සහතික",
      amount: "දඩ මුදල",
      autoSuspend: "දඩ නිකුත් කල පසු අදාළ සහතිකය ස්වයංක්‍රීයව අත්හිටුවේ."
    },

    gsmb: {
      title: "GSMB පුවරුව",
      fines: "දඩ",
      filter: "පෙරහන්",
      all: "සියල්ල",
      paid: "ගෙවූ",
      unpaid: "නොගෙවූ",
      ref: "යොමු",
      reactivate: "සහතිකය නැවත සක්‍රීය කරන්න",
      onlyPaidReactivate: "අත්හිටුවූ ලොරි සඳහා ගෙවූ දඩ සඳහා පමණක් නැවත සක්‍රීය කළ හැක.",
      licenses: "සහතික"
    },

    owner: {
      title: "අයිතිකරුගේ පුවරුව",
      myLicenses: "මගේ සහතික",
      plate: "ලොරි අංකය",
      from: "ආරම්භය",
      to: "කලාව",
      status: "තත්වය",
      myFines: "මගේ දඩ",
      fineId: "දඩ අංකය",
      amount: "මුදල",
      ref: "යොමු",
      action: "ක්‍රියාව",
      payViaLP: "LankaPay මඟින් ගෙවන්න",
      markPaid: "ගෙවා ඇතැයි සලකන්න",
      enterFineId: "ගෙවීමට දඩ අංකය ඇතුල් කරන්න",
      receipt: "ගෙවීම සටහන් කළා. යොමු"
    },

    payment: {
      payTitle: "LankaPay මඟින් ගෙවීම",
      payingFor: "ඔබ ගෙවන්නේ",
      forPlate: "ලොරි සඳහා",
      willReturn: "නැවත යවන ලැයිස්තුව",
      proceed: "LankaPay වෙත යන්න",
      simulateFail: "අසමත් වීම අනුකරණය",
      openSandbox: "Sandbox URL විවෘත කරන්න",
      note: "LankaPay විස්තර ලැබුණු පසු සැබෑ redirect එකක් සවිකරන්න.",
      resultTitle: "ගෙවීම් ප්‍රතිඵලය",
      txn: "ගනුදෙනුව",
      redirecting: "ඔබගේ දඩ යාවත්කාලීන වෙමින්… අයිතිකරු පුවරුවට යවයි.",
      notFound: "දඩය හමු නොවීය. අයිතිකරු පුවරුවට ආපසු යන්න."
    }
  },

  ta: {
    appTitle: "GSMB சுரங்க அனுமதி சரிபார்ப்பு",
    nav: { public: "பொது", login: "உள்நுழை", police: "போலீஸ்", gsmb: "GSMB", owner: "உரிமையாளர்" },
    lang: { label: "மொழி", en: "English", si: "සිංහල", ta: "தமிழ்" },

    public: {
      title: "பொது வலைவாசல்",
      platePlaceholder: "லாரி எண் உள்ளிடவும் (எ.கா., SP-1234)",
      verify: "சரிபார்",
      noLicense: "இவற்கு அனுமதி இல்லை",
      reportTitle: "சந்தேக அறிக்கை",
      location: "இடம்",
      noteOptional: "குறிப்பு (விரும்பினால்)",
      submitReport: "அறிக்கை அனுப்பு",
      thanksReport: "நன்றி! உங்கள் அறிக்கை எண்",
      finesTitle: "அபராதங்கள் (கட்டணம் செலுத்த பார்க்க)",
      searchByPlate: "பலகை மூலம் தேடுங்கள்",
      amount: "தொகை",
      status: "நிலை",
      hintPay: "அபராதம் செலுத்த உரிமையாளராக உள்நுழையவும் அல்லது GSMB-ஐப் பார்வையிடவும்.",
      licensesTitle: "அனைத்து அனுமதிகள் (டெமோ)",
      validWindow: "செல்லாக்காலம்",
      todayValid: "(இன்று செல்லுபடியாகும்)",
      todayInvalid: "(இன்று செல்லாது)"
    },

    login: {
      title: "உள்நுழை",
      username: "பயனர்பெயர்",
      password: "கடவுச்சொல்",
      loginBtn: "உள்நுழை",
      demo: "டெமோ கணக்குகள்",
      police: "போலீஸ்",
      gsmb: "GSMB",
      owner: "உரிமையாளர்",
      invalidCreds: "தவறான சான்றுகள்"
    },

    police: {
      title: "போலீஸ் பலகை",
      incoming: "வருகை அறிக்கைகள்",
      id: "அடையாளம்",
      plate: "பலகை",
      note: "குறிப்பு",
      actions: "நடவடிக்கைகள்",
      valid: "செல்லும்",
      reject: "நிராகரி",
      fineSuspend: "அபராதம் & இடைநீக்கம்",
      licenses: "அனுமதிகள்",
      amount: "அபராதம்",
      autoSuspend: "அபராதம் வழங்கியவுடன் அனுமதி தானாக இடைநிறுத்தப்படும்."
    },

    gsmb: {
      title: "GSMB பலகை",
      fines: "அபராதங்கள்",
      filter: "வடிகட்டு",
      all: "அனைத்து",
      paid: "செலுத்தப்பட்டது",
      unpaid: "செலுத்தப்படவில்லை",
      ref: "குறிப்பு",
      reactivate: "அனுமதியை மீளச் செய்க",
      onlyPaidReactivate: "இடைநிறுத்தப்பட்ட லாரிகளுக்கான செலுத்தப்பட்ட அபராதங்களுக்கு மட்டும் மீளச் செய்யலாம்.",
      licenses: "அனுமதிகள்"
    },

    owner: {
      title: "உரிமையாளர் பலகை",
      myLicenses: "என் அனுமதிகள்",
      plate: "பலகை",
      from: "இருந்து",
      to: "வரை",
      status: "நிலை",
      myFines: "என் அபராதங்கள்",
      fineId: "அபராத ஐடி",
      amount: "தொகை",
      ref: "குறிப்பு",
      action: "செயல்",
      payViaLP: "LankaPay மூலம் கட்டு",
      markPaid: "செலுத்தியது என குறி",
      enterFineId: "அபராத ஐடி உள்ளிடவும்",
      receipt: "கட்டணம் பதிவு செய்யப்பட்டது. குறிப்பு"
    },

    payment: {
      payTitle: "LankaPay மூலம் கட்டணம்",
      payingFor: "நீங்கள் செலுத்துவது",
      forPlate: "லாரிக்காக",
      willReturn: "திரும்ப வரும் முகவரி",
      proceed: "LankaPay செல்ல",
      simulateFail: "தோல்வி ஒத்திகை",
      openSandbox: "Sandbox URL திற",
      note: "LankaPay விவரங்களைப் பெற்றதும் உண்மையான redirect வைத் தயார் செய்க.",
      resultTitle: "கட்டண முடிவு",
      txn: "பரிவர்த்தனை",
      redirecting: "உங்கள் அபராதங்கள் புதுப்பிக்கப்படுகிறது… உரிமையாளர் பலகைக்கு மாற்றப்படும்.",
      notFound: "அபராதம் கிடைக்கவில்லை. உரிமையாளர் பலகைக்கு திரும்பவும்."
    }
  },
}
