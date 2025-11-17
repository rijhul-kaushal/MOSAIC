import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import rawLoginHtml from '@legacy/pages/login.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/login.css?inline'; // This line imports the new CSS

const Login = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawLoginHtml), []);
  const navigate = useNavigate(); // Hook for React-based navigation

  useEffect(() => {
    document.title = 'Sign In - fMosaic Beauty';
  }, []);

  // This line applies the imported CSS to the page
  useScopedCss(pageStyles, 'login-page');
  // We don't use useLegacyLinkNavigation here because the links are handled by the script below

  // --- Start of Login/Signup Logic ---
  // This moves the <script> logic from the HTML into React
  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;

    // Get all elements
    const loginFormSection = container.querySelector('#loginFormSection');
    const signupFormSection = container.querySelector('#signupForm');
    const showSignupLink = container.querySelector('#showSignupLink');
    const showLoginLink = container.querySelector('#showLoginLink');
    const authImagePanel = container.querySelector('#auth-image-panel');
    const loginForm = container.querySelector('#loginForm');
    const registerForm = container.querySelector('#registerForm');
    
    // Check if all elements are found
    if (!loginFormSection || !signupFormSection || !showSignupLink || !showLoginLink || !authImagePanel || !loginForm || !registerForm) {
      return;
    }

    // --- Notification Function ---
    const showNotification = (message) => {
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color, #3F0A29), var(--twilight-lavender, #94426A));
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        transform: translateX(120%);
        transition: transform 0.4s ease-in-out;
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 400);
      }, 3000);
    };

    // --- Event Listeners ---
    const handleShowSignup = (event) => {
      event.preventDefault();
      loginFormSection.style.display = 'none';
      signupFormSection.style.display = 'block';
      authImagePanel.style.backgroundImage = "url('/assets/images/sign_in/signup.png')";
    };

    const handleShowLogin = (event) => {
      event.preventDefault();
      signupFormSection.style.display = 'none';
      loginFormSection.style.display = 'block';
      authImagePanel.style.backgroundImage = "url('/assets/images/sign_in/signin.png')";
    };

    const handleLoginSubmit = (event) => {
      event.preventDefault();
      const usernameInput = container.querySelector('#username').value;
      const passwordInput = container.querySelector('#password').value;
      const errorMessage = container.querySelector('#errorMessage');
      
      const storedUsername = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (usernameInput === storedUsername && passwordInput === storedPassword) {
        showNotification('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/'); // Use React navigation to go home
        }, 1500);
      } else {
        errorMessage.style.display = 'block';
      }
    };

    const handleRegisterSubmit = (event) => {
      event.preventDefault();
      const emailInput = container.querySelector('#signupEmail').value;
      const passwordInput = container.querySelector('#signupPassword').value;
      const confirmPasswordInput = container.querySelector('#confirmPassword').value;
      const passwordError = container.querySelector('#passwordError');

      if (passwordInput !== confirmPasswordInput) {
        passwordError.style.display = 'block';
        return;
      }
      
      passwordError.style.display = 'none';
      localStorage.setItem('userEmail', emailInput);
      localStorage.setItem('userPassword', passwordInput);
      showNotification('Account created successfully! You can now log in.');
      
      setTimeout(() => {
        signupFormSection.style.display = 'none';
        loginFormSection.style.display = 'block';
        authImagePanel.style.backgroundImage = "url('/assets/images/sign_in/signin.png')";
      }, 500);
    };

    // --- Password Confirmation Logic ---
    const confirmPasswordInput = container.querySelector('#confirmPassword');
    const signupPasswordInput = container.querySelector('#signupPassword');
    const passwordError = container.querySelector('#passwordError');

    const validatePasswords = () => {
      const pass = signupPasswordInput.value;
      const confirm = confirmPasswordInput.value;
      if (confirm.length > 0) {
        if (pass !== confirm) {
          passwordError.style.display = 'block';
          passwordError.textContent = 'Passwords do not match. Please try again.';
        } else {
          passwordError.style.display = 'none';
        }
      } else {
        passwordError.style.display = 'none';
      }
    };
    
    // Add all event listeners
    showSignupLink.addEventListener('click', handleShowSignup);
    showLoginLink.addEventListener('click', handleShowLogin);
    loginForm.addEventListener('submit', handleLoginSubmit);
    registerForm.addEventListener('submit', handleRegisterSubmit);
    confirmPasswordInput.addEventListener('input', validatePasswords);
    signupPasswordInput.addEventListener('input', validatePasswords);

    // Cleanup function
    return () => {
      showSignupLink.removeEventListener('click', handleShowSignup);
      showLoginLink.removeEventListener('click', handleShowLogin);
      loginForm.removeEventListener('submit', handleLoginSubmit);
      registerForm.removeEventListener('submit', handleRegisterSubmit);
      confirmPasswordInput.removeEventListener('input', validatePasswords);
      signupPasswordInput.removeEventListener('input', validatePasswords);
    };

  }, [content, navigate]); // Re-run when content is injected or navigate function changes

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Login;