-- =============================================
-- oneWallet - Seed Data
-- Run this in Supabase SQL Editor
-- =============================================

DO $$
DECLARE
  uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users WHERE email = 'miki199838@gmail.com';

  INSERT INTO public.cards (user_id, name, category, card_number, expiry_date, template_id, metadata, sort_order)
  VALUES
    (uid, 'תעודת זהות', 'id', '312456789', '15/03/2029', 'id_il',
     '{"id_expiry": "15/03/2029"}', 1),

    (uid, 'רישיון נהיגה', 'license', '312456789', '20/08/2027', 'license_il',
     '{"license_expiry": "20/08/2027"}', 2),

    (uid, 'רישיון נשק', 'loyalty', '7845-2231', '01/01/2026', 'loyalty',
     '{"holder_name": "מיקי ביזרמן"}', 3),

    (uid, 'כרטיס ביקור', 'visit', NULL, NULL, 'visit',
     '{"phone": "050-1234567"}', 4),

    (uid, 'כרטיס כללי', 'other', '0000-1111-2222', '31/12/2025', 'other',
     '{}', 5);

END $$;
