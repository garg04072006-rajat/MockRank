-- Table to store OTPs for password reset
create table if not exists password_otps (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  otp text not null,
  expires_at timestamptz not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for quick lookup
create index if not exists idx_password_otps_email on password_otps(email);