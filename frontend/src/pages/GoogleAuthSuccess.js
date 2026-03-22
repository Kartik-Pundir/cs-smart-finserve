import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      loginWithToken(token);
      toast.success('Signed in with Google successfully!');
      navigate('/');
    } else {
      toast.error('Google sign-in failed. Please try again.');
      navigate('/login');
    }
  }, [searchParams, loginWithToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#faf8ff' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Completing sign-in...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
