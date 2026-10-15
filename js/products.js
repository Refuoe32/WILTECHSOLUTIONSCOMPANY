/* ============================================================
   WilTec Solutions - shop catalogue
   EDIT THIS FILE to change products and prices (prices in Maloti, M).
   The prices below are SAMPLE prices - replace them with your own.
   ============================================================ */
const PRODUCTS = [
  // Storage & memory
  {id:"ssd-240", name:"SSD 240GB SATA", cat:"Storage & Memory", price:350, icon:"💾", desc:"Fast 2.5\" SATA SSD. Great upgrade for slow laptops and PCs.", image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80"},
  {id:"ssd-480", name:"SSD 480GB SATA", cat:"Storage & Memory", price:550, icon:"💾", desc:"More space and speed for OS and programs.", image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80"},
  {id:"ssd-1tb", name:"SSD 1TB", cat:"Storage & Memory", price:950, icon:"💾", desc:"High capacity solid state drive.", image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80"},
  {id:"ram-8", name:"RAM 8GB DDR4 (Laptop)", cat:"Storage & Memory", price:480, icon:"🧠", desc:"SO-DIMM memory upgrade for smoother multitasking.", image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"},
  {id:"ram-16", name:"RAM 16GB DDR4 (Laptop)", cat:"Storage & Memory", price:850, icon:"🧠", desc:"Double the memory for heavy workloads.", image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"},
  {id:"flash-32", name:"Flash Drive 32GB", cat:"Storage & Memory", price:90, icon:"🔌", desc:"USB 3.0 portable storage.", image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80"},
  {id:"hdd-ext", name:"External Hard Drive 1TB", cat:"Storage & Memory", price:900, icon:"🗄️", desc:"Portable USB 3.0 backup drive.", image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80"},

  // Networking
  {id:"router-n", name:"Wi-Fi Router (Dual Band)", cat:"Networking", price:650, icon:"📡", desc:"Reliable home and office Wi-Fi coverage.", image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80"},
  {id:"extender", name:"Wi-Fi Range Extender", cat:"Networking", price:380, icon:"📶", desc:"Remove dead spots in your home or office.", image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80"},
  {id:"switch-8", name:"8-Port Network Switch", cat:"Networking", price:420, icon:"🔀", desc:"Expand your wired network easily.", image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80"},
  {id:"cat6", name:"Cat6 Network Cable 10m", cat:"Networking", price:120, icon:"🧵", desc:"Shielded Ethernet patch cable.", image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80"},

  // Accessories
  {id:"kb", name:"Wired Keyboard", cat:"Accessories", price:150, icon:"⌨️", desc:"Full-size USB keyboard.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"},
  {id:"mouse", name:"Wireless Mouse", cat:"Accessories", price:130, icon:"🖱️", desc:"Comfortable 2.4GHz wireless mouse.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"},
  {id:"combo", name:"Wireless Keyboard & Mouse Combo", cat:"Accessories", price:320, icon:"🎹", desc:"Clean desk setup with one USB receiver.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"},
  {id:"headset", name:"USB Headset with Mic", cat:"Accessories", price:240, icon:"🎧", desc:"Ideal for calls, online classes and meetings.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"},
  {id:"webcam", name:"HD Webcam", cat:"Accessories", price:380, icon:"📷", desc:"720p/1080p webcam for video calls.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"},
  {id:"hdmi", name:"HDMI Cable 2m", cat:"Accessories", price:80, icon:"🔗", desc:"High-speed HDMI cable.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"},

  // Power
  {id:"charger", name:"Universal Laptop Charger", cat:"Power", price:380, icon:"🔋", desc:"Multi-tip charger for most laptop brands.", image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80"},
  {id:"battery", name:"Laptop Battery Replacement", cat:"Power", price:750, icon:"🔋", desc:"Tell us your model and we will source the right one.", image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80"},
  {id:"ups", name:"UPS 650VA", cat:"Power", price:950, icon:"⚡", desc:"Protect your computer from power cuts and surges.", image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80"},
  {id:"surge", name:"Surge Protector 4-Way", cat:"Power", price:160, icon:"🔌", desc:"Safe power distribution with surge protection.", image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80"},

  // Software & licences
  {id:"win", name:"Windows 10/11 Licence", cat:"Software", price:1100, icon:"🪟", desc:"Genuine licence activation with installation.", image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"},
  {id:"office", name:"Microsoft Office Licence", cat:"Software", price:1300, icon:"📊", desc:"Word, Excel, PowerPoint and more, installed for you.", image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"},
  {id:"av", name:"Antivirus Licence (1 Year)", cat:"Software", price:290, icon:"🛡️", desc:"Real-time protection against viruses and malware.", image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"},

  // Parts
  {id:"screen", name:"Laptop Screen Replacement", cat:"Parts", price:1200, icon:"🖥️", desc:"Price includes fitting. Final price depends on your model.", image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"},
  {id:"kb-rep", name:"Laptop Keyboard Replacement", cat:"Parts", price:450, icon:"⌨️", desc:"Supply and fit a new keyboard for your laptop.", image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"},
  {id:"fan", name:"Cooling Fan / Thermal Service", cat:"Parts", price:300, icon:"🌀", desc:"Fan replacement and thermal paste for overheating machines.", image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"}
];
