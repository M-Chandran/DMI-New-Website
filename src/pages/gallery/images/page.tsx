import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function GalleryImagesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Campus', 'Events', 'Sports', 'Convocation', 'Cultural'];

  const images = [
    { src: 'https://img.sanishtech.com/u/b2827b0b209083e24f834ad84e05411a.jpg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://media.getmyuni.com/azure/college-image/big/dmi-engineering-college-dmiec-kanyakumari.jpg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://dmiengg.edu.in/wp-content/uploads/2024/12/dmi17-1024x768.jpg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://img.sanishtech.com/u/d293e7cf273642d564f6730728d182e5.jpg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://img.sanishtech.com/u/11a8ca119559cf9545d057a01e38bbb3.jpg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://img.sanishtech.com/u/34ed3e70e7701780aeb91a9d05ab8060.jpg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://dmiengg.edu.in/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-01-at-11.34.44-AM-1536x1023.jpeg', category: 'Campus', caption: 'Main Campus Aerial View' },
    { src: 'https://img.sanishtech.com/u/5da397cb994b435c880a40b1bf8af1fc.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/5be720129c13b2d71c3a0c9f407562af.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/27723dfb909c0dd16902cb8df4939996.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/614ba07bded9a8f6cfa409f3363eb97d.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/b37b3ff9f6849f5ff1749cf70ba3721a.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/0aab7f78f56460c2a25a0447df871731.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/aa07ef3a9da6aa38da939b8bef096acd.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/71a1ab0ca7ca762be60540edddaf3fa5.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/0a6306a78350468c661fba64940b4ce8.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/f295a5cb45ddd0b287ecf0163f18fe4d.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/02599731e9e6c388d876c93084516c07.jpg', category: 'Sports', caption: 'Inter-College Cricket Tournament' },
    { src: 'https://img.sanishtech.com/u/ee6b23ad81163190288fae3d30dda617.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/2a199408ba00e01dcc838d9f9856952a.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/7300b210e8d2dc5cada39e982b9bafe8.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/fd6cf3d853ddd9dd0784aee76a0b07a5.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/a76a2cf967f9b90ad3f2aff0a970a870.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/885a095c234c8573de5eaed516a2f70c.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/71fdae7e2b1165ed94316b4ce867091d.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/f4fdcf4694d9f11356a8ce6526cd9cfe.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/cca683d472a8154ec31476274ed86fb1.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/255c13ea45afbc50e45bed8c2c307b37.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/2323f87c65bb3e6eea311ebaf22d7778.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/10608a6e2420f021fc803ace4bc63ecb.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/e97c5c21781960bd8cedef51c5bbc97e.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/748ab4f210c7a98da2b16ff4c318aae4.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/e43b1bd0775cfc8e0fb6e7142f1b06b5.jpg', category: 'Events', caption: 'Annual Day Celebration 2024' },
    { src: 'https://img.sanishtech.com/u/f80e5a751ab7a6d76a0157e1eb772cd6.jpg', category: 'Convocation', caption: 'Convocation Ceremony 2024' },
    { src: 'https://img.sanishtech.com/u/896757dd9dd59cab701a06a79fe4a4b1.jpg', category: 'Convocation', caption: 'Convocation Ceremony 2024' },
    { src: 'https://img.sanishtech.com/u/de016a766a28a845d93844aef57c6670.jpg', category: 'Convocation', caption: 'Convocation Ceremony 2024' },
    { src: 'https://img.sanishtech.com/u/291820949fabb40ce70552af38010739.jpg', category: 'Convocation', caption: 'Convocation Ceremony 2024' },
    { src: 'https://img.sanishtech.com/u/5f855120ff4df97a581d9e6217ebb055.jpg', category: 'Cultural', caption: "Freshers' Day 2024" },
    { src: 'https://img.sanishtech.com/u/e5d7857e6f7ecbffb9ebe8686e74c10a.jpg', category: 'Cultural', caption: "Freshers' Day 2024" },
    { src: 'https://img.sanishtech.com/u/aca8f86364aba2358a3aaf7ef84d2d19.jpg', category: 'Cultural', caption: "Freshers' Day 2024" },
    { src: 'https://img.sanishtech.com/u/542eeecdca0850515dc40673052f9e1f.jpg', category: 'Cultural', caption: "Freshers' Day 2024" },
    { src: 'https://img.sanishtech.com/u/8160db76cff5feec7d7d9a32a12b3c7a.jpg', category: 'Cultural', caption: "Freshers' Day 2024" },
    { src: 'https://img.sanishtech.com/u/2e3451d8529035874ad2ae549d395a6a.jpg', category: 'Cultural', caption: "Freshers' Day 2024" },
    { src: 'https://img.sanishtech.com/u/cfb7f1ab20321dffb3086c854c60c45d.jpg', category: 'Blood donation', caption: "Blood donation Day 2024" },
    { src: 'https://img.sanishtech.com/u/1eb055566cecab313ccb391b5e20a193.jpg', category: 'Blood donation', caption: "Blood donation Day 2024" },
    { src: 'https://img.sanishtech.com/u/5b57c5befc0497d859adbb441372b3f8.jpg', category: 'Independance day', caption: "Independance day' Day 2024" },
    { src: 'https://img.sanishtech.com/u/5fe5abf4a776ed75a9d8aeac9f7c686e.jpg', category: 'Independance day', caption: "Independance day' Day 2024" },
    { src: 'https://img.sanishtech.com/u/7a3efa032542df010df204257bdc25cd.jpg', category: 'onam', caption: "onams' Day 2024" },
    { src: 'https://img.sanishtech.com/u/989a228d378bf000bfdcc1d37d280b75.jpg', category: 'onam', caption: "onams' Day 2024" },
    { src: 'https://img.sanishtech.com/u/95fedbe6be1e6cef6b74a07fda19334c.jpg', category: 'onam', caption: "onams' Day 2024" },
    { src: 'https://img.sanishtech.com/u/1a024ba6170330e72447df040f4f30c1.jpg', category: 'onam', caption: "onams' Day 2024" },
    { src: 'https://img.sanishtech.com/u/8f5b6e72dcd17f14671eff2f832bb87d.jpg', category: 'onam', caption: "onams' Day 2024" },
    { src: 'https://img.sanishtech.com/u/9e2f66eae529d0e9f24a64019d14d4f0.jpg', category: 'onam', caption: "onams' Day 2024" },
    { src: 'https://img.sanishtech.com/u/95b254d8c2fa08da2c0ffc26770ed66b.jpg', category: 'pooja', caption: "pooja' Day 2024" },
    { src: 'https://img.sanishtech.com/u/a5b7bdb6716822ea9eb601b5b901fa58.jpg', category: 'pooja', caption: "pooja' Day 2024" },


  ];
  const filtered = activeCategory === 'All' ? images : images.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        {/* Hero */}
        <div className="bg-gradient-to-r from-sky-700 to-sky-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-sky-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span> <span>Gallery</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Images</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">Photo Gallery</h1>
            <p className="text-sky-100 mt-2">Capturing memories, milestones, and moments at DMI Engineering College</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeCategory === cat ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div key={i} onClick={() => setLightbox(img.src)}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-52">
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <p className="text-white text-sm font-medium px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">{img.caption}</p>
                </div>
                <span className="absolute top-2 right-2 bg-sky-600 text-white text-xs px-2 py-0.5 rounded-full">{img.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl cursor-pointer w-10 h-10 flex items-center justify-center">
            <i className="ri-close-line"></i>
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] rounded-lg object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}

      <Footer />
    </div>
  );
}