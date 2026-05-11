import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


import { useAuth } from '../context/AuthContext';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleGoogleLoginSuccess } = useAuth();

  const hasProcessed = React.useRef(false);

  useEffect(() => {
    const processLogin = async () => {
      if (hasProcessed.current) return;
      hasProcessed.current = true;

      const token = searchParams.get('token');
      
      if (token) {
        const result = await handleGoogleLoginSuccess(token);
        
        if (result.success) {
          toast.success('Successfully signed in with Google!');
          // Redirect based on role if needed, or default to dashboard
          const destination = result.user?.role === 'admin' ? '/admin' : '/dashboard';
          navigate(destination, { replace: true });
        } else {
          toast.error('Failed to load user profile');
          navigate('/login', { replace: true });
        }
      } else {
        toast.error('Authentication failed: No token received');
        navigate('/login', { replace: true });
      }
    };

    processLogin();
  }, [searchParams, navigate, handleGoogleLoginSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p style={{ color: 'var(--text-primary)' }}>Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
