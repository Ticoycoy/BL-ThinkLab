import { LoginForm } from '@/components/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2 bg-card">
        <div className="p-8 sm:p-16 flex flex-col justify-center">
          <LoginForm />
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-primary-foreground text-center space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                It's not about what you make.
                </h1>
                <h2 className="text-3xl font-semibold">
                It's about what you make possible.
                </h2>
                <p className="text-xl text-primary-foreground/80">Welcome to WorkFlowZen!</p>
            </div>
            <Image
                src="resources/brightlocal-logo.png"
                alt="Company Logo"
                width={400}
                height={300}
                className="rounded-lg object-contain"
                data-ai-hint="company logo"
            />
        </div>
      </div>
    </div>
  );
}
