/*
  # Create booking_requests table

  1. New Tables
    - `booking_requests`
      - `id` (uuid, primary key)
      - `name` (text, full name)
      - `email` (text, contact email)
      - `phone` (text, optional phone)
      - `event_type` (text, type of request: booking, festival, etc.)
      - `message` (text, details)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `booking_requests` table
    - Allow authenticated users to read all requests (admin)
    - Allow anyone (anon) to insert new requests (public contact form)
*/

CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  event_type text NOT NULL DEFAULT 'booking',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking request"
  ON booking_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read booking requests"
  ON booking_requests FOR SELECT
  TO authenticated
  USING (true);
