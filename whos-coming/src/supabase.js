import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ukgmpttudocfcxxffxia.supabase.co'
const SUPABASE_KEY = 'sb_publishable_V5Wno_MtEkVYkvbGs-TuuA_ENOAdyl6'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
