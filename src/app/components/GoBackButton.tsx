"use client";
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <div style={{ 
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      zIndex: 100
    }}>
      <button 
        onClick={() => router.back()}
        style={{
          backgroundColor: 'var(--background-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        ← Go Back
      </button>
    </div>
  );
} 