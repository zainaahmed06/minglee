import {account} from "@/services/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  OAuthProvider as AppwriteOAuthProvider,
  ID,
} from "react-native-appwrite";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

// TypeScript interfaces
export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  phone?: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: Record<string, any>;
  labels: string[];
  status: boolean;
}

export interface AuthError {
  code?: string;
  message: string;
  type?: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  password: string;
  oldPassword: string;
}

export interface UpdateNameData {
  name: string;
}

// Use Appwrite's OAuth provider types
export type OAuthProvider =
  | "amazon"
  | "apple"
  | "auth0"
  | "authentik"
  | "autodesk"
  | "bitbucket"
  | "bitly"
  | "box"
  | "dailymotion"
  | "discord"
  | "disqus"
  | "dropbox"
  | "etsy"
  | "facebook"
  | "figma"
  | "github"
  | "gitlab"
  | "google"
  | "linkedin"
  | "microsoft"
  | "notion"
  | "oidc"
  | "okta"
  | "paypal"
  | "paypalSandbox"
  | "podio"
  | "salesforce"
  | "slack"
  | "spotify"
  | "stripe"
  | "tradeshift"
  | "tradeshiftBox"
  | "twitch"
  | "wordpress"
  | "yahoo"
  | "yammer"
  | "yandex"
  | "zoho"
  | "zoom";

export interface OAuthSessionData {
  provider: OAuthProvider;
  redirectUrl?: string;
  scopes?: string[];
  success?: string;
  failure?: string;
}

export interface AuthState {
  // State variables
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: AuthError | null;
  otpEmailVerifications: boolean;
  otpVerified: boolean;
  oauthRedirectUrl: string | null;

  // Actions
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (data: ResetPasswordData) => Promise<void>;
  updatePassword: (data: UpdatePasswordData) => Promise<void>;
  updateName: (data: UpdateNameData) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  initialize: () => Promise<void>;
  setOtpEmailVerifications: (value: boolean) => void;
  setOtpVerified: (value: boolean) => void;
  refreshUserData: () => Promise<User>;
  refreshProfile: () => Promise<User>;

  // OAuth methods
  createOAuthSession: (data: OAuthSessionData) => Promise<string>;
  completeOAuthLogin: (uri: string) => Promise<void>;
  setOAuthRedirectUrl: (url: string | null) => void;

  // Email verification methods
  sendEmailVerification: () => Promise<void>;
  confirmEmailVerification: (userId: string, secret: string) => Promise<void>;
  resendEmailVerification: () => Promise<void>;
}

// Custom error handler
const handleAppwriteError = (error: any): AuthError => {
  const errorMap: Record<string, string> = {
    user_invalid_credentials: "Invalid email or password",
    user_email_already_exists: "Email already exists",
    user_not_found: "User not found",
    user_password_mismatch: "Current password is incorrect",
    user_email_not_whitelisted: "Email domain not allowed",
    general_argument_invalid: "Invalid input provided",
    general_rate_limit_exceeded: "Too many attempts. Please try again later",
    user_session_not_found: "Session expired. Please log in again",
  };

  const message =
    errorMap[error.code] || error.message || "An unexpected error occurred";

  return {
    code: error.code,
    message,
    type: error.type,
  };
};

// Zustand store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      error: null,
      otpEmailVerifications: false,
      otpVerified: false,
      oauthRedirectUrl: null,

      // Initialize auth state on app load
      initialize: async () => {
        try {
          set({isLoading: true, error: null});

          // Check if user session exists
          const session = await account.getSession("current");
          if (session) {
            // Get current user data
            const userData = await account.get();
            set({
              user: userData as User,
              isAuthenticated: true,
              isInitialized: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isInitialized: true,
              isLoading: false,
            });
          }
        } catch (error: any) {
          // Session might be invalid or expired
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
            error: handleAppwriteError(error),
          });
        }
      },

      // Sign up new user
      signUp: async (data: SignUpData) => {
        try {
          set({isLoading: true, error: null, otpEmailVerifications: false});

          // Create account
          await account.create(ID.unique(), data.email, data.password);

          // Auto sign in after successful registration
          await account.createEmailPasswordSession(data.email, data.password);

          // Get user data
          const userData = await account.get();
          await account.createVerification("https://minglee.com/verify");

          set({
            user: userData as User,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
          });
          throw authError;
        }
      },

      // Sign in existing user
      signIn: async (data: SignInData) => {
        try {
          set({isLoading: true, error: null, otpEmailVerifications: false});

          // Create email session
          await account.createEmailPasswordSession(data.email, data.password);

          // Get user data
          const userData = await account.get();

          set({
            user: userData as User,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
          });
          throw authError;
        }
      },

      // Sign out user
      signOut: async () => {
        try {
          set({
            isLoading: true,
            error: null,
            otpEmailVerifications: false,
            otpVerified: false,
          });

          // Delete current session
          await account.deleteSession("current");

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            otpVerified: false,
          });
        } catch (error: any) {
          // Even if logout fails, clear local state
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: handleAppwriteError(error),
            otpVerified: false,
          });
        }
      },

      // Forgot password
      forgotPassword: async (data: ResetPasswordData) => {
        try {
          set({isLoading: true, error: null});

          // Send password recovery email
          await account.createRecovery(
            data.email,
            `${
              process.env.EXPO_PUBLIC_APP_URL || "https://minglee.com"
            }/reset-password`
          );

          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
          });
          throw authError;
        }
      },

      // Update password
      updatePassword: async (data: UpdatePasswordData) => {
        try {
          set({isLoading: true, error: null});

          // Update password
          await account.updatePassword(data.password, data.oldPassword);

          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
          });
          throw authError;
        }
      },

      // Update user name
      updateName: async (data: UpdateNameData) => {
        try {
          set({isLoading: true, error: null});

          // Update name using Appwrite
          const userData = await account.updateName(data.name);

          set({
            user: userData as User,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
          });
          throw authError;
        }
      },

      // Get current user data
      getCurrentUser: async () => {
        try {
          set({isLoading: true, error: null});

          const userData = await account.get();

          set({
            user: userData as User,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: authError,
          });
        }
      },

      // Clear error state
      clearError: () => {
        set({error: null});
      },

      // Set OTP email verification state
      setOtpEmailVerifications: (value: boolean) => {
        set({otpEmailVerifications: value});
      },

      // Set OTP verified state
      setOtpVerified: (value: boolean) => {
        set({otpVerified: value});
      },

      // Send email verification
      sendEmailVerification: async () => {
        try {
          set({isLoading: true, error: null});

          // Send verification email - replace with your app's verification URL
          await account.createVerification("https://minglee.com/verify");

          set({isLoading: false});
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            error: authError,
            isLoading: false,
          });
          throw authError;
        }
      },

      // Confirm email verification
      confirmEmailVerification: async (userId: string, secret: string) => {
        try {
          set({isLoading: true, error: null});

          // Confirm verification
          await account.updateVerification(userId, secret);

          // Refresh user data to get updated emailVerification status
          const userData = await account.get();

          set({
            user: userData as User,
            isLoading: false,
          });
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            error: authError,
            isLoading: false,
          });
          throw authError;
        }
      },

      // Resend email verification
      resendEmailVerification: async () => {
        try {
          set({isLoading: true, error: null});

          // Send verification email again
          await account.createVerification("https://minglee.com/verify");

          set({isLoading: false});
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            error: authError,
            isLoading: false,
          });
          throw authError;
        }
      },

      // Refresh user data only
      refreshUserData: async () => {
        try {
          set({isLoading: true, error: null});

          // Get fresh user data from Appwrite
          const userData = await account.get();

          set({
            user: userData as User,
            isLoading: false,
            error: null,
          });

          return userData as User;
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            error: authError,
            isLoading: false,
          });
          throw authError;
        }
      },

      // Refresh profile (user data only, KYC removed)
      refreshProfile: async () => {
        try {
          set({isLoading: true, error: null});

          // Refresh user data
          const userData = await account.get();

          set({
            user: userData as User,
            isLoading: false,
            error: null,
          });

          return userData as User;
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            error: authError,
            isLoading: false,
          });
          throw authError;
        }
      },

      // Create OAuth session with provider
      createOAuthSession: async (data: OAuthSessionData) => {
        try {
          set({isLoading: true, error: null});

          // Get the redirect URL based on the provider
          const redirectUrl =
            data.redirectUrl ||
            `${
              process.env.EXPO_PUBLIC_APP_URL || "https://minglee.com"
            }/auth/oauth-callback`;

          // Map our OAuth provider to Appwrite's OAuthProvider enum
          const providerMap: Record<OAuthProvider, AppwriteOAuthProvider> = {
            amazon: AppwriteOAuthProvider.Amazon,
            apple: AppwriteOAuthProvider.Apple,
            auth0: AppwriteOAuthProvider.Auth0,
            authentik: AppwriteOAuthProvider.Authentik,
            autodesk: AppwriteOAuthProvider.Autodesk,
            bitbucket: AppwriteOAuthProvider.Bitbucket,
            bitly: AppwriteOAuthProvider.Bitly,
            box: AppwriteOAuthProvider.Box,
            dailymotion: AppwriteOAuthProvider.Dailymotion,
            discord: AppwriteOAuthProvider.Discord,
            disqus: AppwriteOAuthProvider.Disqus,
            dropbox: AppwriteOAuthProvider.Dropbox,
            etsy: AppwriteOAuthProvider.Etsy,
            facebook: AppwriteOAuthProvider.Facebook,
            figma: AppwriteOAuthProvider.Figma,
            github: AppwriteOAuthProvider.Github,
            gitlab: AppwriteOAuthProvider.Gitlab,
            google: AppwriteOAuthProvider.Google,
            linkedin: AppwriteOAuthProvider.Linkedin,
            microsoft: AppwriteOAuthProvider.Microsoft,
            notion: AppwriteOAuthProvider.Notion,
            oidc: AppwriteOAuthProvider.Oidc,
            okta: AppwriteOAuthProvider.Okta,
            paypal: AppwriteOAuthProvider.Paypal,
            paypalSandbox: AppwriteOAuthProvider.PaypalSandbox,
            podio: AppwriteOAuthProvider.Podio,
            salesforce: AppwriteOAuthProvider.Salesforce,
            slack: AppwriteOAuthProvider.Slack,
            spotify: AppwriteOAuthProvider.Spotify,
            stripe: AppwriteOAuthProvider.Stripe,
            tradeshift: AppwriteOAuthProvider.Tradeshift,
            tradeshiftBox: AppwriteOAuthProvider.TradeshiftBox,
            twitch: AppwriteOAuthProvider.Twitch,
            wordpress: AppwriteOAuthProvider.Wordpress,
            yahoo: AppwriteOAuthProvider.Yahoo,
            yammer: AppwriteOAuthProvider.Yammer,
            yandex: AppwriteOAuthProvider.Yandex,
            zoho: AppwriteOAuthProvider.Zoho,
            zoom: AppwriteOAuthProvider.Zoom,
          };

          // Create OAuth session - note this is just a redirect, doesn't return a session object with URL
          account.createOAuth2Session(
            providerMap[data.provider],
            redirectUrl,
            data.failure,
            data.scopes
          );

          // For React Native we need to handle the URL separately
          // This method doesn't return anything as the user is redirected
          set({
            isLoading: false,
            oauthRedirectUrl: redirectUrl,
          });

          return redirectUrl;
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
          });
          throw authError;
        }
      },

      // Complete OAuth login after redirect
      completeOAuthLogin: async (uri: string) => {
        try {
          set({isLoading: true, error: null});

          // Extract the callback parameters from the URI
          const url = new URL(uri);
          const userId = url.searchParams.get("userId");
          const secret = url.searchParams.get("secret");

          // If we have userId and secret, we can complete the authentication
          if (userId && secret) {
            // Create a session using the token approach
            await account.createSession(userId, secret);

            // Get user data after successful authentication
            const userData = await account.get();

            set({
              user: userData as User,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              oauthRedirectUrl: null,
            });
          } else {
            throw new Error("Invalid OAuth callback parameters");
          }
        } catch (error: any) {
          const authError = handleAppwriteError(error);
          set({
            isLoading: false,
            error: authError,
            oauthRedirectUrl: null,
          });
          throw authError;
        }
      },

      // Set OAuth redirect URL
      setOAuthRedirectUrl: (url: string | null) => {
        set({oauthRedirectUrl: url});
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        otpEmailVerifications: state.otpEmailVerifications,
        otpVerified: state.otpVerified,
        oauthRedirectUrl: state.oauthRedirectUrl,
      }),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Handle migration if needed when updating store structure
        if (version === 0) {
          // Migration logic for version 0 to 1
          return {
            ...persistedState,
            isInitialized: false,
            otpEmailVerifications: false,
            otpVerified: false,
          };
        }
        return persistedState;
      },
    }
  )
);

// Hook for accessing auth state
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    otpEmailVerifications,
    otpVerified,
    oauthRedirectUrl,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    updatePassword,
    updateName,
    getCurrentUser,
    clearError,
    initialize,
    setOtpEmailVerifications,
    setOtpVerified,
    sendEmailVerification,
    confirmEmailVerification,
    resendEmailVerification,
    refreshUserData,
    refreshProfile,
    createOAuthSession,
    completeOAuthLogin,
    setOAuthRedirectUrl,
  } = useAuthStore();

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    otpEmailVerifications,
    otpVerified,
    oauthRedirectUrl,

    // Actions
    signUp,
    signIn,
    signOut,
    forgotPassword,
    updatePassword,
    updateName,
    getCurrentUser,
    clearError,
    initialize,
    setOtpEmailVerifications,
    setOtpVerified,
    sendEmailVerification,
    confirmEmailVerification,
    resendEmailVerification,
    refreshUserData,
    refreshProfile,

    // OAuth methods
    createOAuthSession,
    completeOAuthLogin,
    setOAuthRedirectUrl,

    // Computed values
    isLoggedIn: isAuthenticated && !!user,
    userEmail: user?.email || null,
    userName: user?.name || null,
    isEmailVerified: user?.emailVerification || false,
  };
};
