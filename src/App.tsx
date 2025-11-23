import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  User,
  Lock,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BarChart3,
  ShieldQuestion,
  Menu,
  X,
  ChevronRight,
  ArrowUp,
  Plane,
  Ship,
  Zap,
  Star,
  TrendingUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Home,
  RefreshCw,
  Briefcase,
  Building2,
  Printer,
  QrCode,
  FileText,
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithCustomToken,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

// --- ERROR BOUNDARY COMPONENT ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 text-center font-sans">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full border border-red-100">
            <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Something went wrong.
            </h1>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We're sorry, but the application encountered an unexpected error.
              Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition w-full shadow-md active:scale-95"
            >
              Reload Application
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">
                  Technical Details
                </summary>
                <pre className="mt-2 p-4 bg-slate-100 text-red-800 rounded text-xs overflow-auto max-h-48 border border-slate-200">
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- FIREBASE SETUP ---
// WARNING: YOUR PRIVATE CONFIGURATION IS NOW HARDCODED HERE.
// DO NOT SHARE THIS FILE PUBLICLY WITHOUT SECURING THESE KEYS.
const firebaseConfig = {
  apiKey: 'AIzaSyABRWq4kxbqtbo_3URUAfcdYYSs4jE0moM',
  authDomain: 'rtsexpress-ecd26.firebaseapp.com',
  projectId: 'rtsexpress-ecd26',
  storageBucket: 'rtsexpress-ecd26.firebasestorage.app',
  messagingSenderId: '452362420561',
  appId: '1:452362420561:web:4557ed80d8ad321fb19370',
  measurementId: 'G-LY25CMSJN1',
};

// Initialize Firebase directly with your config
let app, auth, db;
let firebaseError = null;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  firebaseError = e;
  console.error('Error initializing Firebase with custom config:', e);
}

// --- EYE-CATCHING LOADING SCREEN ---
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black opacity-80"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-500 rounded-full blur-md animate-float"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center z-10">
        {/* Bike Container */}
        <div className="relative mb-16 animate-bounce-slight">
          {/* Glowing Pulse Effect behind bike */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full animate-pulse-slow"></div>

          <img
            src="/logo.png"
            alt="MRTS Express Logo"
            className="h-48 w-auto relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
          />

          {/* Animated Road */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200%] h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500 to-transparent animate-road-move opacity-50"></div>
          </div>
        </div>

        {/* Modern Text Animation */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-black text-white tracking-widest uppercase">
            MRTS <span className="text-red-600">Express</span>
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <span
              className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            ></span>
            <span
              className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></span>
            <span
              className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            ></span>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.4em] animate-pulse">
            Initializing Systems
          </p>
        </div>
      </div>
    </div>
  );
}

// --- TOP BAR COMPONENT (Fills empty space professionally) ---
const TopBar = React.memo(function TopBar() {
  return (
    <div className="bg-slate-950 text-slate-400 text-xs md:text-sm py-2.5 border-b border-slate-900 relative z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex space-x-8">
          <a
            href="tel:+918420289520"
            className="flex items-center hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5 mr-2 text-red-600" />
            <span>+91 8420289520</span>
          </a>
          <a
            href="mailto:support@rtsexpress.in"
            className="flex items-center hover:text-white transition-colors"
          >
            <Mail className="h-3.5 w-3.5 mr-2 text-red-600" />
            <span>support@rtsexpress.in</span>
          </a>
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#" className="hover:text-white transition-colors">
            Global Network
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Partner Careers
          </a>
          <div className="h-4 w-px bg-slate-800 mx-2"></div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="#" className="hover:text-sky-400 transition-colors">
              <Twitter className="h-3.5 w-3.5" />
            </a>
            <a href="#" className="hover:text-blue-700 transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

// --- MAIN APP COMPONENT ---
function RTSExpressApp() {
  const [currentView, setCurrentView] = useState('home');
  // For transition effect
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser] = useState(null);
  const [trackingQueryResult, setTrackingQueryResult] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [initError, setInitError] = useState(firebaseError);
  const bikeTimeoutRef = useRef(null);
  const contentRevealTimeoutRef = useRef(null);

  // Secret Door State
  const [secretClicks, setSecretClicks] = useState(0);

  // Use your specific Project ID as the app identifier for data storage
  const appId = 'rtsexpress-ecd26';

  useEffect(() => {
    if (initError) {
      setIsAppLoading(false);
      return;
    }

    if (!auth) {
      setInitError(new Error('Authentication service not initialized.'));
      setIsAppLoading(false);
      return;
    }

    let unsubscribeAuth;

    // Robust Auth Initialization Sequence
    const initializeAppSequence = async () => {
      try {
        // 1. Minimum aesthetic loading time
        const minTimer = new Promise((resolve) => setTimeout(resolve, 3000));

        // 2. Authentication Handshake
        const authPromise = new Promise((resolve, reject) => {
          // Listen for the very first auth state change
          unsubscribeAuth = onAuthStateChanged(
            auth,
            (currentUser) => {
              setUser(currentUser);
              if (currentUser) {
                resolve(currentUser);
              }
              // Note: We don't reject immediately if null, as we might be waiting for signInAnonymously to complete below.
            },
            (error) => reject(error)
          );

          // If not already authenticated, trigger anonymous sign-in
          if (!auth.currentUser) {
            // Since we are now using your direct config, we likely only need anonymous auth for tracking
            signInAnonymously(auth).catch(reject);
          } else {
            // Already authenticated (e.g., hot reload)
            resolve(auth.currentUser);
          }
        });

        // Wait for both simultaneously
        await Promise.all([minTimer, authPromise]);
      } catch (error) {
        console.error('App initialization failed:', error);
        // Don't block the app completely if auth fails initially, user might still want to see static pages
        // setInitError(error);
      } finally {
        setIsAppLoading(false);
      }
    };

    initializeAppSequence();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initError]);

  // Stabilized navigateTo with useCallback and proper cleanup
  const navigateTo = useCallback(
    (view) => {
      if (view === currentView) return;

      // Clear any existing transition timers to prevent clashes
      if (bikeTimeoutRef.current) clearTimeout(bikeTimeoutRef.current);
      if (contentRevealTimeoutRef.current)
        clearTimeout(contentRevealTimeoutRef.current);

      setIsTransitioning(true);
      setIsMenuOpen(false);

      // Wait for entrance animation of the bike
      bikeTimeoutRef.current = setTimeout(() => {
        setCurrentView(view);
        window.scrollTo(0, 0);

        // Wait for bike to exit screen before revealing content
        contentRevealTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }, 800);
    },
    [currentView]
  );

  // Cleanup transition timers on unmount
  useEffect(() => {
    return () => {
      if (bikeTimeoutRef.current) clearTimeout(bikeTimeoutRef.current);
      if (contentRevealTimeoutRef.current)
        clearTimeout(contentRevealTimeoutRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Secret Knock Handler
  const handleSecretKnock = () => {
    const newCount = secretClicks + 1;
    setSecretClicks(newCount);
    if (newCount >= 5) {
      setSecretClicks(0);
      navigateTo('login');
    }
  };

  if (initError) {
    throw initError;
  }

  if (isAppLoading) {
    return <LoadingScreen />;
  }

  // Check if the current user is a real (non-anonymous) user to show Admin button
  const isRealUser = user && !user.isAnonymous;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      {/* CUSTOM BIKE TRANSITION OVERLAY */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-500 ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute w-full overflow-hidden h-60 flex items-center`}
        >
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-[1600ms] ease-in-out ${
              isTransitioning ? 'translate-x-[120vw]' : '-translate-x-[30vw]'
            }`}
          >
            <div className="relative">
              {/* Speed lines */}
              <div className="absolute top-1/2 -translate-y-1/2 right-full mr-8 flex flex-col space-y-2 opacity-70">
                <div className="w-32 h-1 bg-gradient-to-l from-red-500 to-transparent rounded-full"></div>
                <div className="w-48 h-1 bg-gradient-to-l from-white to-transparent rounded-full delay-75 ml-8"></div>
                <div className="w-24 h-1 bg-gradient-to-l from-red-500 to-transparent rounded-full delay-150 ml-4"></div>
              </div>
              <img
                src="/logo.png"
                alt="Loading..."
                className="h-32 w-auto object-contain drop-shadow-2xl"
                style={{
                  animation: isTransitioning
                    ? 'bounce-slight 0.5s infinite alternate'
                    : 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TOP BAR */}
      <TopBar />

      {/* MAIN NAVIGATION */}
      <nav className="bg-white/95 backdrop-blur-xl text-slate-800 shadow-sm sticky top-0 z-50 border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <div
              className="flex items-center cursor-pointer group py-2"
              onClick={() => navigateTo('home')}
            >
              {/* LOGO SECTION - ELEGANT & VISIBLE */}
              <img
                src="/logo.png"
                alt="MRTS Express Logo"
                className="h-[4.5rem] w-auto mr-4 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xl"
              />
              <div className="hidden sm:flex flex-col justify-center">
                <h1 className="text-3xl font-black tracking-tighter leading-none">
                  <span className="text-slate-900">MRTS</span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                    EXPRESS
                  </span>
                </h1>
                <div className="flex items-center mt-1">
                  <div className="h-0.5 w-4 bg-red-600 mr-2 rounded-full"></div>
                  <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-[0.3em]">
                    Global Logistics
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1 items-center font-bold text-sm uppercase tracking-wider">
              {['home', 'services', 'support', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  className={`relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group ${
                    currentView === item
                      ? 'text-red-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`relative z-10 transition-colors duration-300`}
                  >
                    {item}
                  </span>
                  {currentView === item && (
                    <span className="absolute inset-0 bg-red-50 rounded-full -z-0 animate-fadeIn"></span>
                  )}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </button>
              ))}

              {isRealUser ? (
                <div className="flex items-center space-x-3 ml-8 pl-8 border-l border-slate-200 h-10">
                  <button
                    onClick={() => navigateTo('admin')}
                    className="bg-slate-900 hover:bg-red-600 text-white px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center uppercase shadow-lg shadow-slate-900/20 hover:shadow-red-600/30 active:scale-95"
                  >
                    <Lock className="h-3.5 w-3.5 mr-2" /> Admin
                  </button>
                  <button
                    onClick={() => signOut(auth)}
                    className="text-sm text-slate-500 hover:text-slate-800 uppercase px-4 py-2 transition font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // LOGIN BUTTON REMOVED FOR PUBLIC "HIDDEN" VIEW
                <div className="ml-8"></div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-full bg-slate-50 text-slate-900 hover:bg-slate-100 transition-colors duration-200 active:scale-90"
              >
                {isMenuOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden fixed top-[96px] left-0 w-full bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-10 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 space-y-2">
            {['home', 'services', 'support', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => navigateTo(item)}
                className={`block px-6 py-4 rounded-2xl text-lg font-black w-full text-left transition-all duration-200 active:scale-[0.98] ${
                  currentView === item
                    ? 'bg-red-50 text-red-600 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            {isRealUser && (
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => navigateTo('admin')}
                  className="block px-6 py-4 rounded-2xl text-lg font-bold bg-slate-900 text-white w-full text-left shadow-lg active:scale-[0.98]"
                >
                  <Lock className="inline-block h-5 w-5 mr-3 mb-1" /> Admin
                  Dashboard
                </button>
                <button
                  onClick={() => signOut(auth)}
                  className="block px-6 py-4 rounded-2xl text-lg font-medium text-slate-500 hover:bg-slate-50 w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA WITH FADE TRANSITION */}
      <main
        className={`flex-grow transition-opacity duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentView === 'home' && (
          <HomeView
            navigateTo={navigateTo}
            setTrackingResult={setTrackingQueryResult}
            appId={appId}
            user={user}
            auth={auth}
          />
        )}
        {currentView === 'services' && <ServicesView />}
        {currentView === 'support' && <SupportView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'login' && (
          <LoginView navigateTo={navigateTo} user={user} />
        )}
        {currentView === 'admin' && (
          <AdminView user={user} navigateTo={navigateTo} appId={appId} />
        )}
        {currentView === 'tracking_result' && (
          <TrackingResultView
            result={trackingQueryResult}
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-slate-900/80 hover:bg-red-600 text-white p-4 rounded-full shadow-lg backdrop-blur-sm transition-all duration-500 z-50 hover:-translate-y-2 hover:shadow-2xl ${
          showScrollTop
            ? 'opacity-100 translate-y-0 rotate-0'
            : 'opacity-0 translate-y-20 rotate-180 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* COL 1: ABOUT (5 Cols) */}
          <div className="md:col-span-5 pr-8">
            <div className="flex items-center text-white mb-8">
              {/* FOOTER LOGO */}
              <img
                src="/logo.png"
                alt="MRTS Express"
                className="h-24 w-auto mr-4 brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm leading-7 max-w-md text-slate-400 font-light mb-6">
              MRTS Express is a global leader in next-generation logistics,
              powered by AI and a relentless commitment to speed. Connecting
              200+ countries with precision and trust.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-800 hover:bg-red-600 p-2 rounded-full text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-sky-500 p-2 rounded-full text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-blue-700 p-2 rounded-full text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-pink-600 p-2 rounded-full text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* COL 2: QUICK NAV (3 Cols) */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-b border-slate-800 pb-2 inline-block">
              Explore
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {[
                'Home',
                'Our Services',
                'Track Shipment',
                'Help Center',
                'Contact Us',
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() =>
                      navigateTo(
                        ['home', 'services', 'home', 'support', 'contact'][i]
                      )
                    }
                    className="hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-red-600 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: CONNECT (4 Cols) */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-b border-slate-800 pb-2 inline-block">
              Headquarters
            </h3>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start group">
                <div className="bg-slate-900 p-2 rounded-lg mr-4 border border-slate-800">
                  <MapPin className="h-4 w-4 text-red-600" />
                </div>
                <span className="group-hover:text-slate-200 transition leading-relaxed">
                  BA-52, Salt Lake Rd, BA Block
                  <br />
                  Sector 1, Bidhannagar
                  <br />
                  Kolkata, West Bengal 700064
                </span>
              </li>
              <li className="flex items-center group">
                <div className="bg-slate-900 p-2 rounded-lg mr-4 border border-slate-800">
                  <Phone className="h-4 w-4 text-red-600" />
                </div>
                <span className="group-hover:text-slate-200 transition">
                  +91 8420289520
                </span>
              </li>
              <li className="flex items-center group">
                <div className="bg-slate-900 p-2 rounded-lg mr-4 border border-slate-800">
                  <Mail className="h-4 w-4 text-red-600" />
                </div>
                <span className="group-hover:text-slate-200 transition">
                  support@rtsexpress.in
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-600">
          {/* SECRET KNOCK TRIGGER - CLICK COPYRIGHT 5 TIMES */}
          <p
            onClick={handleSecretKnock}
            className="cursor-pointer select-none active:text-red-500 transition-colors duration-100 hover:text-slate-300"
          >
            © {new Date().getFullYear()} MRTS Express Logistics Pvt Ltd. All
            rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- WRAPPER (Crucial for Error Boundary to work) ---
export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <RTSExpressApp />
    </ErrorBoundary>
  );
}

// --- VIEWS ---

function HomeView({ navigateTo, setTrackingResult, appId, user, auth }) {
  const [trackingInput, setTrackingInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackType, setTrackType] = useState('awb');
  const [isReconnecting, setIsReconnecting] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    setLoading(true);
    setError('');
    setIsReconnecting(false);

    // Auto-reconnection attempt if user session is lost
    if (!user) {
      setIsReconnecting(true);
      try {
        await signInAnonymously(auth);
      } catch (reconnectError) {
        console.error('Reconnection failed:', reconnectError);
        setError('Connection lost. Please refresh the page and try again.');
        setLoading(false);
        setIsReconnecting(false);
        return;
      }
    }

    try {
      const q = query(
        collection(db, 'artifacts', appId, 'public', 'data', 'shipments'),
        where('trackingId', '==', trackingInput.trim().toUpperCase())
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Shipment not found. Please double-check your Tracking ID.');
        setLoading(false);
      } else {
        const shipmentData = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };
        setTrackingResult(shipmentData);
        setLoading(false);
        navigateTo('tracking_result');
      }
    } catch (err) {
      console.error('Tracking error:', err);
      // More specific error messages for better UX
      if (err.code === 'permission-denied') {
        setError(
          'Access denied. establishing secure connection, please try again in a moment.'
        );
      } else if (err.code === 'unavailable') {
        setError('Network issue. Please check your internet connection.');
      } else {
        setError('Unable to track right now. Please try again later.');
      }
      setLoading(false);
    } finally {
      setIsReconnecting(false);
    }
  };

  return (
    <div className="bg-slate-50">
      {/* HERO SECTION */}
      <div className="relative min-h-[85vh] flex items-center">
        {/* Background Image Area */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Logistics Operations"
            className="w-full h-full object-cover opacity-40 scale-105 animate-slowPan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text */}
          <div className="animate-fadeInLeft">
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-red-400 text-sm font-bold uppercase tracking-wider">
                Leading Global Logistics
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
              Shipping that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Moves
              </span>{' '}
              the World.
            </h1>
            <p className="text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-10">
              Experience seamless shipping with real-time tracking, unmatched
              reliability, and a global network dedicated to your success.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('services')}
                className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all duration-300 active:scale-95 shadow-lg shadow-white/10"
              >
                Explore Services
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 active:scale-95 backdrop-blur-sm"
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* Tracking Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white/40 animate-fadeInRight">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
              Track Your Shipment
            </h2>
            <div className="flex justify-center space-x-4 mb-8 bg-slate-100/50 p-1.5 rounded-2xl">
              {['awb', 'ref'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTrackType(type)}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    trackType === type
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {type === 'awb' ? 'AWB Number' : 'Reference No.'}
                </button>
              ))}
            </div>

            <form onSubmit={handleTrack} className="space-y-6">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-red-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder={
                    trackType === 'awb'
                      ? 'Enter AWB (e.g., RTS-12345)'
                      : 'Enter Reference Number'
                  }
                  className="w-full pl-16 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl focus:ring-0 focus:border-red-500 outline-none text-lg font-bold text-slate-900 transition-all duration-300 placeholder:font-medium placeholder:text-slate-400"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading || (isReconnecting && !user)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl text-xl font-bold hover:bg-red-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-red-500/30 active:scale-[0.98] flex items-center justify-center"
              >
                {loading || isReconnecting ? (
                  <>
                    <RefreshCw className="animate-spin mr-3 h-5 w-5 text-white" />
                    {isReconnecting ? 'Connecting...' : 'Locating...'}
                  </>
                ) : (
                  <>
                    Track Now <ArrowRight className="ml-3 h-6 w-6" />
                  </>
                )}
              </button>

              {/* Connection Status Indicator */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    user ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
                  }`}
                ></div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {user
                    ? 'Ready to Track'
                    : 'Establishing Secure Connection...'}
                </p>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center text-sm font-bold animate-shake shadow-sm">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" /> {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SLOGAN BANNER */}
      <div className="bg-white py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
              The Game
            </span>{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              Changers
            </span>
          </h2>
          <p className="text-5xl md:text-6xl font-black uppercase tracking-tight text-slate-900 mb-16">
            Are Here<span className="text-red-600">.</span>
          </p>
          <div className="inline-block relative group cursor-default hover:scale-105 transition-transform duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-16 py-6 bg-white ring-1 ring-slate-900/5 rounded-2xl leading-none flex items-top justify-start space-x-6">
              <p className="text-xl md:text-3xl font-bold text-slate-800 italic">
                Superfast Next Day Committed Delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-red-600 font-black uppercase tracking-widest text-sm mb-6 block">
              Why Partner With Us
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-8">
              Redefining Logistics for the Modern Era
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed font-light">
              We're not just another courier service. We're a technology-first
              logistics partner built to scale with your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-white" />}
              title="Lightning Fast Setup"
              desc="Get started in minutes, not days. Our streamlined onboarding process means you can start shipping immediately."
              color="from-orange-400 to-red-600"
            />
            <FeatureCard
              icon={<ShieldQuestion className="h-12 w-12 text-white" />}
              title="Uncompromised Security"
              desc="Your shipments are precious. We use advanced tracking and secure handling protocols to ensure they arrive safely, every time."
              color="from-blue-500 to-indigo-600"
            />
            <FeatureCard
              icon={<TrendingUp className="h-12 w-12 text-white" />}
              title="Scalable Solutions"
              desc="Whether you're shipping 10 or 10,000 packages a day, our infrastructure is built to grow seamlessly with your business."
              color="from-green-400 to-emerald-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-3 transition-all duration-500">
      <div
        className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${color}`}
      ></div>
      <div
        className={`mb-10 inline-flex p-5 rounded-[2rem] bg-gradient-to-br ${color} shadow-2xl`}
      >
        {icon}
      </div>
      <h3 className="text-3xl font-extrabold text-slate-900 mb-6">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-xl font-medium">
        {desc}
      </p>
    </div>
  );
}

function TrackingResultView({ result, navigateTo }) {
  if (!result) return null;

  const currentStatus = result.currentStatus || 'Unknown';
  const sortedHistory = [...(result.history || [])].sort(
    (a, b) => b.timestamp?.seconds - a.timestamp?.seconds
  );
  const latestLocation =
    result.currentLocation || result.destination || 'New York';

  // Simple logic to check if it's "At Your Home" or delivered to show the special tag
  const isAtHome =
    currentStatus === 'Out for Delivery' || currentStatus === 'Delivered';

  const statusColors = {
    Delivered: 'bg-green-500 shadow-green-500/30',
    Exception: 'bg-red-500 shadow-red-500/30',
    'In Transit': 'bg-blue-500 shadow-blue-500/30',
    'Shipment Picked Up': 'bg-blue-500 shadow-blue-500/30', // New
    'Arrived at Hub': 'bg-indigo-500 shadow-indigo-500/30', // New
    'Out for Delivery': 'bg-orange-500 shadow-orange-500/30',
    'Booking Created': 'bg-slate-500 shadow-slate-500/30', // New
    default: 'bg-slate-500 shadow-slate-500/30',
  };
  const statusColor = statusColors[currentStatus] || statusColors['default'];

  return (
    <div className="bg-slate-100 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('home')}
          className="mb-10 flex items-center text-slate-600 hover:text-slate-900 font-bold transition-colors duration-200 group bg-white px-8 py-4 rounded-full shadow-sm hover:shadow-md text-lg"
        >
          <ArrowRight className="h-6 w-6 mr-3 rotate-180 transition-transform group-hover:-translate-x-1 text-red-600" />{' '}
          Back to Home
        </button>

        <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden">
          {/* STATUS HEADER */}
          <div className="bg-slate-900 p-12 md:p-20 relative overflow-hidden">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-slate-800 to-transparent"></div>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                  <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">
                    Live Tracking
                  </p>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                  {result.trackingId}
                </h1>
                <p className="text-slate-400 font-medium text-xl">
                  Air Waybill Number
                </p>
              </div>
              <div className="flex flex-col items-end space-y-4 mt-10 lg:mt-0">
                <div
                  className={`px-12 py-6 rounded-[2rem] font-black text-2xl uppercase flex items-center shadow-2xl text-white ${statusColor} transition-transform hover:scale-105`}
                >
                  {currentStatus === 'Delivered' ? (
                    <CheckCircle className="h-10 w-10 mr-5" />
                  ) : (
                    <Truck className="h-10 w-10 mr-5" />
                  )}
                  {currentStatus}
                </div>
                {isAtHome && (
                  <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full text-white font-bold flex items-center border border-white/20">
                    <Home className="h-5 w-5 mr-3" /> Arriving at your home
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* DETAILS & HISTORY */}
            <div className="lg:col-span-3 p-12 md:p-20 border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="grid grid-cols-2 gap-x-20 gap-y-16 mb-24">
                <DetailItem
                  label="Origin"
                  value={result.origin}
                  icon={
                    <MapPin className="h-6 w-6 text-red-500 mb-3 opacity-50" />
                  }
                />
                <DetailItem
                  label="Destination"
                  value={result.destination}
                  icon={
                    <MapPin className="h-6 w-6 text-red-500 mb-3 opacity-50" />
                  }
                />
                <DetailItem
                  label="Est. Delivery"
                  value={result.estimatedDelivery || 'Pending'}
                  icon={
                    <Clock className="h-6 w-6 text-red-500 mb-3 opacity-50" />
                  }
                />
                <DetailItem
                  label="Service Type"
                  value="Standard Express"
                  icon={
                    <Truck className="h-6 w-6 text-red-500 mb-3 opacity-50" />
                  }
                />
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center">
                Shipment Progress
              </h3>
              <div className="space-y-0 relative pl-10 md:pl-14 before:absolute before:left-[1.7rem] md:before:left-[2.2rem] before:top-3 before:h-[calc(100%-3rem)] before:w-1 before:bg-slate-100">
                {sortedHistory.map((event, index) => (
                  <div key={index} className="relative pb-16 last:pb-0 group">
                    <div
                      className={`absolute -left-[3rem] md:-left-[3.5rem] top-1.5 h-6 w-6 md:h-8 md:w-8 rounded-full border-[4px] md:border-[6px] transition-all duration-500 z-10 bg-white ${
                        index === 0
                          ? 'border-red-600 shadow-[0_0_0_4px_rgba(239,68,68,0.2)] scale-110'
                          : 'border-slate-300 group-hover:border-slate-400'
                      }`}
                    ></div>
                    <div
                      className={`p-8 md:p-10 rounded-[2rem] border transition-all duration-300 ${
                        index === 0
                          ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 border-transparent'
                          : 'bg-white hover:bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <p
                          className={`font-extrabold text-2xl md:text-3xl ${
                            index === 0 ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {event.status}
                        </p>
                        {event.timestamp && (
                          <p
                            className={`text-sm font-bold uppercase tracking-wider ${
                              index === 0 ? 'text-slate-400' : 'text-slate-400'
                            }`}
                          >
                            {new Date(
                              event.timestamp.seconds * 1000
                            ).toLocaleString([], {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </p>
                        )}
                      </div>
                      <p
                        className={`flex items-center text-lg font-medium ${
                          index === 0 ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        <MapPin
                          className={`h-5 w-5 mr-3 ${
                            index === 0 ? 'text-red-500' : 'text-slate-400'
                          }`}
                        />{' '}
                        {event.location}
                      </p>
                      {event.notes && (
                        <p
                          className={`text-base italic mt-6 pt-6 border-t ${
                            index === 0
                              ? 'border-slate-800 text-slate-400'
                              : 'border-slate-100 text-slate-500'
                          }`}
                        >
                          "{event.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP SECTION */}
            <div className="lg:col-span-2 bg-slate-100 flex flex-col min-h-[700px] lg:min-h-0 relative overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  latestLocation
                )}&t=m&z=11&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-1000"
                title="Shipment Location"
              ></iframe>
              {/* Glassmorphism Overlay Card */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl border border-white/50 animate-slideUp">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm text-slate-500 uppercase font-black tracking-widest mb-2">
                      Current Location
                    </span>
                    <strong className="text-3xl font-extrabold text-slate-900 block truncate">
                      {latestLocation}
                    </strong>
                  </div>
                  <div className="bg-red-600 p-5 rounded-[2rem] text-white shadow-lg shadow-red-500/30 animate-pulse-slow">
                    <MapPin className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div>
      {icon}
      <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-3">
        {label}
      </p>
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function ServicesView() {
  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      {/* Decorative Blurred Blobs for Background */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-32">
          <span className="inline-block text-red-500 font-black tracking-[0.3em] uppercase mb-8 animate-fadeIn">
            Our Expertise
          </span>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-none">
            Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Reimagined.
            </span>
          </h1>
          <p className="text-3xl text-slate-400 leading-relaxed font-light max-w-2xl mx-auto">
            Future-ready solutions designed to accelerate your business in a
            ExPress-connected world.
          </p>
        </div>

        {/* Modern Bento-style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Truck className="h-12 w-12 text-white" />}
            title="Rapid Domestic"
            desc="Same-day delivery network across many cities. When tomorrow is too late, we deliver today."
            color="from-red-500 to-orange-500"
          />
          <ServiceCard
            icon={<Search className="h-12 w-12 text-white" />}
            title="Precision Tracking"
            desc="Stay informed with regular milestone updates. Know when your package arrives at key hubs, is out for delivery, and delivered at your home."
            color="from-blue-500 to-indigo-500"
          />
          <ServiceCard
            icon={<Zap className="h-12 w-12 text-white" />}
            title="E-commerce Pro"
            desc="End-to-end fulfillment: warehousing, packing, and hyper-local last-mile delivery."
            color="from-green-400 to-emerald-600"
          />
          <ServiceCard
            icon={<BarChart3 className="h-12 w-12 text-white" />}
            title="Smart Freight"
            desc="AI-optimized routes for bulk cargo via air, sea, and road. Cost-effective and scalable."
            color="from-violet-500 to-purple-500"
          />
          <ServiceCard
            icon={<ShieldQuestion className="h-12 w-12 text-white" />}
            title="Secure Handling"
            desc="Specialized protocols for high-value, fragile, or temperature-sensitive shipments."
            color="from-amber-400 to-orange-600"
          />

          {/* Feature Card - Custom Solutions */}
          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-800 to-slate-950 p-12 rounded-[3rem] shadow-2xl border border-slate-800 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-auto">
                <h3 className="text-4xl font-black text-white mb-6 leading-tight">
                  Need something bespoke?
                </h3>
                <p className="text-slate-400 text-xl mb-10 font-medium leading-relaxed">
                  Our logistics architects can design a custom supply chain
                  tailored specifically to your unique business goals.
                </p>
              </div>
              <div className="flex items-center text-red-400 font-bold text-xl group-hover:text-red-300 transition-colors">
                Consult an Expert{' '}
                <ArrowUpRight className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc, color }) {
  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-lg p-12 rounded-[3rem] border border-slate-700/50 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-slate-600">
      {/* Hover Gradient Reveal */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${color}`}
      ></div>

      <div className="relative z-10">
        <div
          className={`mb-10 inline-flex p-6 rounded-[2rem] bg-gradient-to-br ${color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}
        >
          {icon}
        </div>
        <h3 className="text-4xl font-black text-white mb-6">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-xl font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}

function SupportView() {
  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-28">
          <h1 className="text-7xl md:text-8xl font-black text-slate-900 mb-10 tracking-tight">
            Help Center
          </h1>
          <p className="text-3xl text-slate-600 font-light">
            Find fast answers or connect with our support team.
          </p>
        </div>

        <div className="space-y-20">
          <div className="space-y-8">
            <FaqItem
              q="How do I track my shipment?"
              a="You can track your shipment using the tracking number (AWB) provided by the sender. Enter it on our homepage for real-time updates."
              isOpen={true}
            />
            <FaqItem
              q="What if I missed my delivery?"
              a="Our courier will usually attempt delivery again the next business day. You will also receive a notification with options to reschedule or pick up from a local hub."
            />
            <FaqItem
              q="How do I calculate shipping costs?"
              a="Shipping costs depend on the weight, dimensions, origin, and destination of your package. Please contact us for a precise quote."
            />
            <FaqItem
              q="Are there prohibited items?"
              a="Yes, hazardous materials, illegal goods, and certain other items cannot be shipped. Please refer to our full terms and conditions for a detailed list."
            />
          </div>

          <div className="bg-slate-900 p-16 md:p-24 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/30">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>

            <div className="relative z-10">
              <ShieldQuestion className="h-24 w-24 text-red-500 mx-auto mb-10" />
              <h3 className="text-5xl font-black mb-8">Still need help?</h3>
              <p className="text-slate-300 text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Our dedicated support team is available 24/7 to assist with any
                shipping issues.
              </p>
              <button className="bg-white text-slate-900 px-14 py-6 rounded-[2rem] font-black text-2xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl active:scale-95">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a, isOpen = false }) {
  return (
    <details
      className="group border-2 border-slate-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 open:border-slate-900 open:shadow-xl"
      open={isOpen}
    >
      <summary className="flex justify-between items-center font-extrabold text-2xl cursor-pointer list-none p-10 bg-white hover:bg-slate-50 text-slate-900 transition-colors duration-300">
        <span>{q}</span>
        <span className="bg-slate-100 p-4 rounded-full group-open:bg-red-600 group-open:text-white transition-all duration-300">
          <ArrowUp className="h-7 w-7 transition-transform duration-500 group-open:rotate-180" />
        </span>
      </summary>
      <div className="px-10 pb-10 pt-2 bg-white text-slate-600 leading-relaxed text-xl font-medium">
        {a}
      </div>
    </details>
  );
}

function ContactView() {
  return (
    <div>
      {/* HERO BANNER */}
      <div className="relative h-[50vh] bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Global Connectivity"
          className="w-full h-full object-cover opacity-20 scale-105 animate-slowPan"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="inline-block text-red-500 font-black tracking-[0.3em] uppercase mb-6 animate-fadeInUp">
              Get In Touch
            </span>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none animate-fadeInUp animation-delay-200">
              Let's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Connect.
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 -mt-32 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-28 items-start">
          <div className="space-y-16">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50">
              <h2 className="text-4xl font-black text-slate-900 mb-12">
                Contact Information
              </h2>
              <div className="space-y-12">
                <ContactInfoItem
                  icon={<MapPin />}
                  title="Global Headquarters"
                  content={
                    <>
                      BA-52, Salt Lake Rd, BA Block
                      <br />
                      Sector 1, Bidhannagar, Kolkata
                      <br />
                      West Bengal 700064
                    </>
                  }
                />
                <ContactInfoItem
                  icon={<Phone />}
                  title="Phone Support"
                  content="+91 8420289520"
                />
                <ContactInfoItem
                  icon={<Mail />}
                  title="Email Us"
                  content="support@rtsexpress.in"
                />
              </div>
            </div>

            {/* EMBEDDED MAP */}
            <div className="h-[400px] w-full rounded-[3.5rem] overflow-hidden shadow-xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.052869647846!2d88.40398737596877!3d22.595917932721746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b61d2c8b19%3A0x31495c612c6c6711!2sBA-52%2C%20Salt%20Lake%20Rd%2C%20BA%20Block%2C%20Sector%201%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal%20700064%2C%20India!5e0!3m2!1sen!2sus!4v1709500000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-1000"
              ></iframe>
            </div>
          </div>

          <div className="bg-white p-16 md:p-20 rounded-[5rem] shadow-2xl shadow-slate-900/5 sticky top-32">
            <h2 className="text-5xl font-black text-slate-900 mb-6">
              Send a Message
            </h2>
            <p className="text-xl text-slate-500 mb-16 font-medium">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-4 group-focus-within:text-red-600 transition-colors">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:ring-0 focus:border-red-500 outline-none transition-all font-bold text-xl text-slate-900"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-4 group-focus-within:text-red-600 transition-colors">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:ring-0 focus:border-red-500 outline-none transition-all font-bold text-xl text-slate-900"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-4 group-focus-within:text-red-600 transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:ring-0 focus:border-red-500 outline-none transition-all font-bold text-xl text-slate-900"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-4 group-focus-within:text-red-600 transition-colors">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:ring-0 focus:border-red-500 outline-none transition-all resize-none font-bold text-xl text-slate-900"
                ></textarea>
              </div>
              <button className="w-full bg-slate-900 hover:bg-red-600 text-white py-7 rounded-[3rem] font-black text-2xl transition-all duration-300 shadow-xl hover:shadow-red-500/20 active:scale-[0.98] mt-8 flex items-center justify-center">
                Send Message <ArrowRight className="ml-4 h-6 w-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, content }) {
  return (
    <div className="flex items-start group">
      <div className="bg-red-50 p-6 rounded-[2rem] mr-8 flex-shrink-0 group-hover:bg-red-600 transition-colors duration-500">
        {React.cloneElement(icon, {
          className: `h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-500`,
        })}
      </div>
      <div>
        <h3 className="font-black text-2xl text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-xl font-medium">
          {content}
        </p>
      </div>
    </div>
  );
}

function LoginView({ navigateTo, user }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is fully authenticated (not anonymous)
    if (user && !user.isAnonymous) {
      navigateTo('admin');
    }
  }, [user, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // In a real scenario, you would trigger a Google Auth or Email Auth popup here.
      // For this specific demo flow, we are simulating the login action.
      // If the user is anonymous, we might want to "upgrade" them or just move them to admin.
      // Note: Since this is a demo, we are treating the button click as "Success" if they are already connected to firebase.

      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      navigateTo('admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-10 bg-white p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50">
        <div className="text-center">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] inline-block mb-10 shadow-lg shadow-slate-900/20">
            <Lock className="h-14 w-14 text-white" />
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            Admin Portal
          </h2>
          <p className="mt-6 text-slate-500 text-xl font-medium">
            Secure access for authorized personnel.
          </p>
        </div>
        <div className="mt-16 space-y-10">
          {error && (
            <div className="text-red-700 bg-red-50 p-6 rounded-[2rem] font-bold text-lg text-center flex items-center justify-center">
              <AlertCircle className="h-6 w-6 mr-3" /> {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-6 px-8 border border-transparent text-2xl font-black rounded-[3rem] text-white bg-slate-900 hover:bg-red-600 disabled:opacity-70 transition-all duration-300 shadow-xl hover:shadow-red-500/20 active:scale-[0.98] flex items-center justify-center"
          >
            {loading ? (
              <>Authenticating...</>
            ) : (
              <>
                Enter Dashboard <ArrowRight className="ml-4 h-6 w-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- ADMIN VIEW ---
function AdminView({ user, navigateTo, appId }) {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [labelToPrint, setLabelToPrint] = useState(null); // State for Label Modal
  const [statusUpdate, setStatusUpdate] = useState({
    status: 'In Transit',
    location: '',
    notes: '',
  });
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState({
    type: '',
    message: '',
    details: '',
  });

  useEffect(() => {
    if (!user || !appId) {
      if (!user && !loading) navigateTo('login');
      return;
    }

    // Removed orderBy to prevent potential index-related permission errors
    const q = query(
      collection(db, 'artifacts', appId, 'public', 'data', 'shipments')
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const shipmentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort client-side instead
        shipmentList.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });
        setShipments(shipmentList);
        setLoading(false);
      },
      (error) => {
        console.error('Snapshot listener error:', error);
        setNotification({
          type: 'error',
          message: 'Real-time Sync Error',
          details: 'Could not fetch latest data. Please refresh.',
        });
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user, navigateTo, appId]);

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(
        () => setNotification({ type: '', message: '', details: '' }),
        10000
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleApprove = async (shipment) => {
    setNotification({
      type: 'success',
      message: 'Processing...',
      details: 'Approving booking...',
    });
    try {
      const shipmentRef = doc(
        db,
        'artifacts',
        appId,
        'public',
        'data',
        'shipments',
        shipment.id
      );

      // FIX: Ensure no undefined values are passed to Firestore
      const location = shipment.origin || 'Processing Hub';

      const updatedHistory = [
        ...(shipment.history || []),
        {
          status: 'Shipment Picked Up',
          location: location,
          timestamp: new Date(),
          notes: 'Booking Approved by Admin. Label Generated.',
        },
      ];

      await updateDoc(shipmentRef, {
        currentStatus: 'Shipment Picked Up',
        history: updatedHistory,
      });

      setNotification({
        type: 'success',
        message: 'Booking Approved',
        details: 'Ready for labeling.',
      });
      setLabelToPrint(shipment); // Auto-open label after approval
    } catch (error) {
      console.error('Approval Error:', error);
      setNotification({
        type: 'error',
        message: 'Approval Failed',
        details: error.message,
      });
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedShipment || !user) return;
    setUpdating(true);
    try {
      const shipmentRef = doc(
        db,
        'artifacts',
        appId,
        'public',
        'data',
        'shipments',
        selectedShipment.id
      );

      // FIX: Ensure safe values
      const safeLocation = statusUpdate.location || 'In Transit';
      const safeNotes = statusUpdate.notes || '';

      const updatedHistory = [
        ...(selectedShipment.history || []),
        {
          status: statusUpdate.status,
          location: safeLocation,
          notes: safeNotes,
          timestamp: new Date(),
        },
      ];

      await updateDoc(shipmentRef, {
        currentStatus: statusUpdate.status,
        currentLocation: safeLocation,
        history: updatedHistory,
      });
      setSelectedShipment(null);
      setStatusUpdate({ status: 'In Transit', location: '', notes: '' });
      setNotification({
        type: 'success',
        message: 'Status Updated',
        details: `Shipment ${selectedShipment.trackingId} updated.`,
      });
    } catch (error) {
      console.error('Error updating:', error);
      setNotification({
        type: 'error',
        message: 'Update Failed',
        details: error.message,
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-[95rem] mx-auto py-16 px-6 lg:px-10 bg-slate-100 min-h-[calc(100vh-5rem)]">
      {/* IN-APP NOTIFICATION TOAST */}
      {notification.message && (
        <div
          className={`fixed top-24 right-10 z-50 p-6 rounded-[2rem] shadow-2xl animate-slideInRight flex items-start max-w-md ${
            notification.type === 'success'
              ? 'bg-green-900 text-white'
              : 'bg-red-900 text-white'
          }`}
        >
          <div
            className={`p-3 rounded-full mr-4 ${
              notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <AlertCircle className="h-6 w-6" />
            )}
          </div>
          <div>
            <h4 className="font-black text-lg mb-1">{notification.message}</h4>
            <p className="font-medium opacity-90 text-xl">
              {notification.details}
            </p>
          </div>
          <button
            onClick={() =>
              setNotification({ type: '', message: '', details: '' })
            }
            className="ml-4 opacity-70 hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 bg-slate-900 p-12 rounded-[4rem] shadow-2xl shadow-slate-900/20 text-white">
        <h1 className="text-5xl font-black flex items-center mb-8 md:mb-0">
          <div className="bg-red-600 p-5 rounded-[2rem] mr-8 shadow-lg shadow-red-600/20">
            <Lock className="h-10 w-10 text-white" />
          </div>
          Dispatch Command Center
        </h1>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden md:block">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              Current User
            </p>
            <p className="text-white font-bold text-lg">Administrator</p>
          </div>
          <div className="h-14 w-14 bg-slate-800 rounded-full flex items-center justify-center border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <User className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>

      {/* METRICS ROW (Placeholder for Dashboard Phase 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-10 rounded-[3rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center">
          <div className="bg-blue-100 p-6 rounded-[2rem] mr-6 text-blue-600">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
              Pending Bookings
            </p>
            <p className="text-4xl font-black text-slate-900">
              {
                shipments.filter((s) => s.currentStatus === 'Booking Created')
                  .length
              }
            </p>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center">
          <div className="bg-orange-100 p-6 rounded-[2rem] mr-6 text-orange-600">
            <Truck className="h-8 w-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
              In Transit
            </p>
            <p className="text-4xl font-black text-slate-900">
              {
                shipments.filter(
                  (s) =>
                    s.currentStatus === 'In Transit' ||
                    s.currentStatus === 'Shipment Picked Up'
                ).length
              }
            </p>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center">
          <div className="bg-green-100 p-6 rounded-[2rem] mr-6 text-green-600">
            <CheckCircle className="h-8 w-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
              Delivered Today
            </p>
            <p className="text-4xl font-black text-slate-900">0</p>
          </div>
        </div>
      </div>

      {/* DISPATCH QUEUE */}
      <div className="bg-white rounded-[4rem] shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-14 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">
              Dispatch Queue
            </h2>
            <p className="text-slate-500 font-medium">
              Manage incoming bookings from your worker portal.
            </p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button className="px-8 py-4 bg-white border-2 border-slate-200 rounded-[2rem] font-bold text-slate-600 hover:border-slate-400 transition-all flex items-center shadow-sm">
              <Search className="h-5 w-5 mr-3" /> Search
            </button>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-bold hover:bg-slate-800 transition-all flex items-center shadow-lg shadow-slate-900/20">
              <RefreshCw className="h-5 w-5 mr-3" /> Refresh Feed
            </button>
          </div>
        </div>
        {loading ? (
          <div className="p-40 text-center">
            <div className="inline-block w-20 h-20 border-[8px] border-slate-200 border-t-red-600 rounded-full animate-spin mb-8"></div>
            <p className="text-slate-500 font-bold text-2xl">
              Syncing with Worker Portal...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-12 py-8 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    ID & Date
                  </th>
                  <th className="px-12 py-8 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Route Info
                  </th>
                  <th className="px-12 py-8 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-12 py-8 text-right text-xs font-black text-slate-400 uppercase tracking-widest">
                    Quick Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="hover:bg-slate-50 transition-colors duration-300 group"
                  >
                    <td className="px-12 py-8 whitespace-nowrap">
                      <div className="font-black text-xl text-slate-900">
                        {shipment.trackingId}
                      </div>
                      <div className="text-sm font-bold text-slate-400 mt-1">
                        {shipment.createdAt
                          ? new Date(
                              shipment.createdAt.seconds * 1000
                            ).toLocaleDateString()
                          : 'Just now'}
                      </div>
                    </td>
                    <td className="px-12 py-8 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center text-lg font-bold text-slate-700">
                          <div className="w-24 truncate">{shipment.origin}</div>
                          <ArrowRight className="h-4 w-4 mx-3 text-slate-300" />
                          <div className="w-24 truncate">
                            {shipment.destination}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">
                          Standard Express
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-8 whitespace-nowrap">
                      <StatusBadge status={shipment.currentStatus} />
                    </td>
                    <td className="px-12 py-8 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-3">
                        {/* Approval Workflow */}
                        {shipment.currentStatus === 'Booking Created' ? (
                          <button
                            onClick={() => handleApprove(shipment)}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-[1.5rem] font-bold text-sm shadow-lg shadow-green-500/30 transition-all active:scale-95 flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => setLabelToPrint(shipment)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-[1.5rem] font-bold text-sm transition-all active:scale-95 flex items-center border border-slate-200"
                          >
                            <Printer className="h-4 w-4 mr-2" /> Label
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setStatusUpdate({
                              ...statusUpdate,
                              location: shipment.currentLocation || '',
                            });
                          }}
                          className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-3 rounded-full transition-colors"
                        >
                          <Menu className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {shipments.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-12 py-32 text-center text-slate-400 italic text-2xl font-medium"
                    >
                      Queue is empty. Waiting for worker bookings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* LABEL PRINTING MODAL */}
      {labelToPrint && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-fadeIn">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full p-10 relative">
            <button
              onClick={() => setLabelToPrint(null)}
              className="absolute top-6 right-6 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center">
              <Printer className="mr-4 h-8 w-8 text-red-600" /> Print Label
              Preview
            </h2>

            <div className="flex flex-col md:flex-row gap-10">
              {/* VISUAL PREVIEW OF 4x6 LABEL */}
              <div className="flex-shrink-0 bg-white border-4 border-slate-900 w-[384px] h-[576px] p-6 relative flex flex-col justify-between shadow-2xl">
                {/* Label Header */}
                <div className="border-b-4 border-slate-900 pb-4 mb-4 flex justify-between items-start">
                  <img
                    src="/logo.png"
                    className="h-16 w-auto object-contain"
                    alt="Logo"
                  />
                  <div className="text-right">
                    <h3 className="font-black text-3xl">EXP</h3>
                    <p className="font-bold text-sm">STANDARD</p>
                  </div>
                </div>

                {/* Routing Code */}
                <div className="text-center border-b-4 border-slate-900 pb-4 mb-4">
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
                    KOL-05
                  </h1>
                  <p className="font-bold text-slate-500">ROUTING CODE</p>
                </div>

                {/* Address Block */}
                <div className="flex-grow space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                      SHIP TO:
                    </p>
                    <p className="font-bold text-lg leading-tight">
                      {labelToPrint.receiver || 'Receiver Name'}
                    </p>
                    <p className="font-medium text-sm leading-tight mt-1">
                      {labelToPrint.destination || 'Destination City, Country'}
                    </p>
                    <p className="font-medium text-sm mt-1">
                      {labelToPrint.destinationAddress ||
                        'No detailed address provided'}
                    </p>
                  </div>
                  <div className="border-t-2 border-dashed border-slate-300 pt-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                      FROM:
                    </p>
                    <p className="font-bold text-sm leading-tight">
                      {labelToPrint.sender || 'Sender Name'}
                    </p>
                    <p className="font-medium text-xs leading-tight mt-1">
                      {labelToPrint.origin || 'Origin City'}
                    </p>
                  </div>
                </div>

                {/* Footer / Barcode */}
                <div className="mt-4 pt-4 border-t-4 border-slate-900">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-[10px] font-bold">WEIGHT: 2.5 KG</p>
                      <p className="text-[10px] font-bold">
                        DATE: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <QrCode className="h-16 w-16 text-slate-900" />
                  </div>
                  <div className="h-12 bg-slate-900 w-full flex items-center justify-center text-white font-mono tracking-[0.5em] text-xs">
                    * {labelToPrint.trackingId} *
                  </div>
                  <p className="text-center font-black text-lg mt-1">
                    {labelToPrint.trackingId}
                  </p>
                </div>
              </div>

              {/* Print Controls */}
              <div className="flex-grow flex flex-col justify-center space-y-6">
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2" /> Printing Instructions
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                    <li>Use a standard 4x6 inch thermal label printer.</li>
                    <li>Ensure scale is set to 100% in print settings.</li>
                    <li>Affix label to the largest flat side of the box.</li>
                  </ul>
                </div>
                <button
                  onClick={() => window.print()}
                  className="w-full py-6 bg-slate-900 hover:bg-red-600 text-white rounded-[2rem] font-black text-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center"
                >
                  <Printer className="mr-4 h-8 w-8" /> Print Now
                </button>
                <button
                  onClick={() => setLabelToPrint(null)}
                  className="w-full py-4 bg-white border-2 border-slate-200 text-slate-600 hover:text-slate-900 rounded-[2rem] font-bold text-lg transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {selectedShipment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-[4rem] shadow-2xl max-w-2xl w-full p-16 animate-scaleIn">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-4xl font-black text-slate-900">
                Update Status
              </h3>
              <span className="bg-slate-100 px-8 py-4 rounded-[2rem] font-black text-slate-900 text-xl">
                {selectedShipment.trackingId}
              </span>
            </div>
            <form onSubmit={handleUpdateStatus} className="space-y-10">
              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-5">
                  New Status
                </label>
                <div className="relative">
                  <select
                    className="w-full p-7 border-2 border-slate-200 rounded-[2.5rem] focus:outline-none focus:border-slate-900 bg-white font-bold text-xl appearance-none transition-all"
                    value={statusUpdate.status}
                    onChange={(e) =>
                      setStatusUpdate({
                        ...statusUpdate,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Booking Created</option> {/* New */}
                    <option>Shipment Picked Up</option> {/* New */}
                    <option>Arrived at Hub</option> {/* New */}
                    <option>In Transit</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Exception</option>
                    <option>Customs Clearance</option>
                  </select>
                  <ChevronRight className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90 h-7 w-7 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <InputGroup
                label="Current Location"
                value={statusUpdate.location}
                onChange={(e) =>
                  setStatusUpdate({ ...statusUpdate, location: e.target.value })
                }
                placeholder="e.g., Distribution Center, Chicago"
              />
              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-5">
                  Notes (Optional)
                </label>
                <textarea
                  rows="3"
                  className="w-full p-7 border-2 border-slate-200 rounded-[2.5rem] focus:outline-none focus:border-slate-900 resize-none font-bold text-xl transition-all"
                  value={statusUpdate.notes}
                  onChange={(e) =>
                    setStatusUpdate({ ...statusUpdate, notes: e.target.value })
                  }
                  placeholder="Any additional details..."
                ></textarea>
              </div>
              <div className="flex space-x-8 pt-10">
                <button
                  type="button"
                  onClick={() => setSelectedShipment(null)}
                  className="flex-1 py-6 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-[3rem] font-black text-2xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-6 bg-red-600 hover:bg-red-700 text-white rounded-[3rem] font-black text-2xl transition-all shadow-xl hover:shadow-red-500/30 disabled:opacity-50 active:scale-[0.98]"
                >
                  {updating ? 'Updating...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InputGroup({ label, value, onChange, placeholder, required = true }) {
  return (
    <div>
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">
        {label}
      </label>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        className="p-6 border-2 border-slate-200 rounded-[2.5rem] w-full text-lg font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition-all"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Delivered: 'bg-green-100 text-green-800',
    Exception: 'bg-red-100 text-red-800',
    'In Transit': 'bg-blue-100 text-blue-800',
    'Shipment Picked Up': 'bg-blue-100 text-blue-800', // New
    'Arrived at Hub': 'bg-indigo-100 text-indigo-800', // New
    'Out for Delivery': 'bg-orange-100 text-orange-800', // Added for consistency
    'Booking Created': 'bg-slate-100 text-slate-800', // New
    default: 'bg-slate-100 text-slate-800',
  };
  const style = styles[status] || styles['default'];

  return (
    <span
      className={`px-6 py-3 inline-flex text-sm leading-5 font-black uppercase tracking-widest rounded-full ${style}`}
    >
      {status}
    </span>
  );
}
