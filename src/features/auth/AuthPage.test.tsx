import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AuthPage } from './AuthPage';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    signIn: vi.fn(),
    signUp: vi.fn()
  })
}));

describe('AuthPage', () => {
  it('renders sign in heading', () => {
    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Secure access')).toBeInTheDocument();
  });
});
