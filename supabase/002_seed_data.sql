-- ============================================
-- VANSLIST SEED DATA
-- Run AFTER 001_schema.sql
-- ============================================

-- TASKS (universal across all trades)
insert into public.tasks (name, slug, description, icon, sort_order) values
  ('Marketing', 'marketing', 'Social media, ads, SEO, email campaigns, review management', '📣', 1),
  ('Scheduling', 'scheduling', 'Appointment booking, calendar management, dispatch, routing', '📅', 2),
  ('Estimating', 'estimating', 'Quotes, proposals, takeoffs, pricing calculations', '🧮', 3),
  ('Customer Service', 'customer-service', 'Call answering, chatbots, follow-ups, review responses', '📞', 4),
  ('Admin & Invoicing', 'admin-invoicing', 'Bookkeeping, invoicing, expense tracking, payroll', '📋', 5),
  ('Documentation', 'documentation', 'Reports, inspections, compliance paperwork, notes', '📝', 6),
  ('Content Creation', 'content-creation', 'Blog posts, video scripts, newsletters, descriptions', '✍️', 7),
  ('Design & Editing', 'design-editing', 'Photo editing, graphic design, rendering, visualization', '🎨', 8),
  ('Lead Generation', 'lead-generation', 'Lead capture, qualification, nurturing, pipeline', '🎯', 9),
  ('Client Management', 'client-management', 'CRM, contracts, onboarding, retention', '🤝', 10),
  ('Training & Hiring', 'training-hiring', 'Job descriptions, onboarding docs, SOPs, interview prep', '🎓', 11),
  ('Inventory & Purchasing', 'inventory-purchasing', 'Stock tracking, reordering, supplier management', '📦', 12);

-- CONTENT TYPES
insert into public.content_types (name, slug, description, icon, sort_order) values
  ('Prompt', 'prompt', 'Copy-paste templates for ChatGPT, Claude, or Gemini', '💬', 1),
  ('App', 'app', 'SaaS tools reviewed in plain English with honest pros/cons', '📱', 2),
  ('Workflow', 'workflow', 'Multi-step chains connecting 2+ tools', '🔄', 3),
  ('Automation', 'automation', 'Set-and-forget systems that run without daily input', '⚡', 4),
  ('Template', 'template', 'Ready-made assets like email sequences, forms, calendars', '📄', 5),
  ('Skill', 'skill', 'Short task-specific tutorials teaching one AI capability', '🎯', 6),
  ('Stack', 'stack', 'Curated bundle showing complete toolkit with total cost', '🏗️', 7);

-- PLUMBER TRADE
insert into public.trades (name, slug, description, icon, category, priority_tier, is_active, seo_title, seo_description) values
  ('Plumber', 'plumber', 'AI tools, prompts, and workflows built for plumbing businesses. Stop losing calls, speed up estimates, and get your evenings back.', '🔧', 'Home Services', 1, true,
   'AI for Plumbers — Tools, Prompts & Workflows | VansList',
   'The best AI tools for plumbing businesses. Reviewed in plain English. Copy-paste prompts, step-by-step workflows, and complete tool stacks with real pricing.');

-- ============================================
-- PLUMBER LISTINGS (Seed Content)
-- ============================================

-- We need task and content_type IDs, so we use subqueries

-- APP: Jobber AI
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, cost_display, cost_monthly,
  pros, cons, the_catch, external_url,
  is_verified, last_verified_at, is_featured, status
) values (
  'Jobber AI', 'jobber-ai',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'scheduling'),
  (select id from public.content_types where slug = 'app'),
  'All-in-one scheduling, quoting, and dispatch for small plumbing teams.',
  'Jobber is a field service management platform with AI features for scheduling, route optimization, and automated dispatch. It handles online booking, invoicing, and client communication in one place. Best for solo plumbers or small teams (1-5 people) who want to stop juggling spreadsheets and phone calls. The AI scheduling suggests optimal routes and auto-assigns jobs based on technician location and skill.',
  'beginner',
  'From $39/mo', 39,
  ARRAY['Easy setup, most plumbers are using it within a day', 'AI route optimization saves real drive time', 'Clients can book online 24/7', 'Invoicing and payment built in'],
  ARRAY['Gets pricey with more users ($119/mo for teams)', 'Inventory tracking is basic', 'Phone app can be glitchy on older devices'],
  'The $39/mo "Core" plan is limited — you will probably need the $119 "Connect" plan to get quoting and automated follow-ups. They know this.',
  'https://getjobber.com',
  true, now(), true, 'published'
);

-- APP: ServiceTitan AI
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, cost_display, cost_monthly,
  pros, cons, the_catch, external_url,
  is_verified, last_verified_at, status
) values (
  'ServiceTitan', 'servicetitan',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'scheduling'),
  (select id from public.content_types where slug = 'app'),
  'Enterprise-grade field service management with AI dispatching, pricebook, and reporting.',
  'ServiceTitan is the big dog of home service software. It handles dispatching, pricebook management, marketing tracking, and reporting with AI-powered features like smart scheduling and demand forecasting. Best for established plumbing companies doing $1M+ in revenue with multiple trucks. It is a powerful system, but it is not a casual purchase.',
  'intermediate',
  'From $250+/mo (custom pricing)', 250,
  ARRAY['Most comprehensive platform in the industry', 'AI dispatching optimizes technician assignments in real-time', 'Marketing ROI tracking shows which ads actually generate calls', 'Pricebook management with good/better/best options'],
  ARRAY['Expensive — pricing is opaque and requires a sales call', 'Long onboarding process (weeks, not days)', 'Overkill for solo operators or 2-person shops', 'Annual contracts are standard'],
  'They will not show you pricing until you get on a sales call. Most plumbers report paying $250-500+/month depending on features. There is usually an annual commitment. This is not a tool you try for a month.',
  'https://www.servicetitan.com',
  true, now(), 'published'
);

-- APP: Housecall Pro
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, cost_display, cost_monthly,
  pros, cons, the_catch, external_url,
  is_verified, last_verified_at, status
) values (
  'Housecall Pro', 'housecall-pro',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'scheduling'),
  (select id from public.content_types where slug = 'app'),
  'Scheduling, invoicing, and online booking with a clean mobile app plumbers actually like using.',
  'Housecall Pro sits between Jobber and ServiceTitan in features and price. It handles scheduling, dispatching, estimates, invoicing, and customer communication. The mobile app is its strongest feature — technicians can manage their entire day from their phone. AI features include automated review requests, smart scheduling suggestions, and automated follow-up messages.',
  'beginner',
  'From $79/mo', 79,
  ARRAY['Best mobile app in the category — techs love it', 'Online booking widget for your website', 'Automated review requests after completed jobs', 'Real-time GPS tracking of your team'],
  ARRAY['Price jump between plans is steep ($79 to $189)', 'Reporting is not as deep as ServiceTitan', 'Limited customization on forms and templates'],
  'The $79/mo plan caps some features. Most plumbing companies end up on the $189/mo "Essentials" plan. The consumer financing feature (letting customers pay over time) sounds great until you see the processing fees.',
  'https://www.housecallpro.com',
  true, now(), 'published'
);

-- APP: CountBricks
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, cost_display, cost_monthly,
  pros, cons, the_catch, external_url,
  is_verified, last_verified_at, status
) values (
  'CountBricks', 'countbricks',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'estimating'),
  (select id from public.content_types where slug = 'app'),
  'Voice or text AI estimator — describe the job, get a material and labor estimate back.',
  'CountBricks uses AI to generate estimates from voice descriptions or text input. Instead of manually calculating materials and labor, you describe the job ("40-gallon water heater install, basement, copper to PEX transition") and it produces an itemized estimate you can send to customers. It pulls from regional pricing data and you can adjust your markup. Early-stage tool but the concept is exactly what plumbers need.',
  'beginner',
  'Free trial, then subscription', null,
  ARRAY['Dramatically faster than manual estimating', 'Voice input means you can estimate from the truck', 'Learns your pricing preferences over time', 'Produces customer-ready PDF estimates'],
  ARRAY['Still new — accuracy varies by job type', 'Regional pricing data not perfect everywhere', 'Limited integrations with other tools'],
  'This is a newer tool so the estimate accuracy is not perfect yet. Always review before sending to a customer. Think of it as a fast first draft, not a final answer.',
  'https://countbricks.com',
  true, now(), 'published'
);

-- APP: Upfirst AI
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, cost_display, cost_monthly,
  pros, cons, the_catch, external_url,
  is_verified, last_verified_at, status
) values (
  'Upfirst', 'upfirst',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'customer-service'),
  (select id from public.content_types where slug = 'app'),
  'AI phone answering that books appointments and captures leads 24/7 — no more missed calls.',
  'Upfirst is an AI-powered virtual receptionist that answers your business phone when you cannot. It handles basic questions, captures caller information, and can book appointments directly into your calendar. For plumbers, this solves one of the biggest revenue leaks — the 27% of calls that go unanswered, each worth an estimated $1,200 in lost revenue. You set up the AI with your services, pricing, and availability, and it handles the rest.',
  'beginner',
  'From $25/mo', 25,
  ARRAY['Catches calls you would otherwise miss completely', 'Works 24/7 including nights and weekends', 'Sends you a text summary after each call', 'Setup takes under 30 minutes'],
  ARRAY['AI voice can sound robotic on complex questions', 'Cannot handle true emergency dispatch decisions', 'Callers sometimes hang up when they realize it is AI'],
  'It works great for basic call capture and appointment booking. But if a caller has a complex question about a specific plumbing issue, the AI may fumble. Best paired with your own callbacks during business hours — let the AI catch what you miss, not replace you entirely.',
  'https://www.upfirst.com',
  true, now(), 'published'
);

-- APP: NiceJob
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, cost_display, cost_monthly,
  pros, cons, the_catch, external_url,
  is_verified, last_verified_at, status
) values (
  'NiceJob', 'nicejob',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'marketing'),
  (select id from public.content_types where slug = 'app'),
  'Automated review requests that get plumbers 4x more Google reviews on autopilot.',
  'NiceJob automates the process of asking customers for reviews after a job. It sends timed text and email requests, makes it one-tap easy for customers to leave a Google review, and can share positive reviews to your social media automatically. For plumbers, Google reviews are everything — they directly impact your ranking in local search and the Map Pack. NiceJob takes a task most plumbers know they should do but never get around to and puts it on autopilot.',
  'beginner',
  'From $75/mo', 75,
  ARRAY['Set it and forget it — reviews come in automatically', 'Customers find it easy to use (one tap)', 'Auto-shares good reviews to social media', 'Integrates with Jobber, Housecall Pro, and ServiceTitan'],
  ARRAY['$75/mo is a lot for just review management', 'You need a steady flow of completed jobs for it to work', 'Some customers find automated requests annoying'],
  'At $75/month, this is a premium price for what is essentially automated text messages asking for reviews. It works — plumbers consistently report getting more reviews — but you could achieve something similar with a Zapier automation for less money. The question is whether your time is worth the $75/mo savings.',
  'https://nicejob.com',
  true, now(), 'published'
);

-- PROMPT: Follow-up text
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, llm_compatibility,
  prompt_text, is_verified, last_verified_at, status
) values (
  'Follow-Up Text After Sending a Quote', 'follow-up-text-after-quote',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'lead-generation'),
  (select id from public.content_types where slug = 'prompt'),
  'Get a friendly follow-up text when a customer ghosts your quote. Creates urgency without being pushy.',
  'Most plumbers send a quote and then either forget to follow up or send something awkward. This prompt generates a natural, friendly follow-up text that nudges the customer to make a decision. Works best 2-3 days after sending the quote.',
  'beginner',
  ARRAY['chatgpt', 'claude', 'gemini'],
  E'I''m a plumber in [YOUR CITY]. A customer got a quote from me for [DESCRIBE THE JOB, e.g., "water heater replacement"] for [QUOTE AMOUNT]. They haven''t responded in [NUMBER] days.\n\nWrite a friendly follow-up text message that:\n- Reminds them of the quote without being salesy\n- Creates gentle urgency (busy season, scheduling filling up, etc.)\n- Keeps it under 3 sentences\n- Sounds like a real person, not a business\n- Ends with an easy yes/no question',
  true, now(), 'published'
);

-- PROMPT: Google Business Description
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, llm_compatibility,
  prompt_text, is_verified, last_verified_at, status
) values (
  'Write Your Google Business Profile Description', 'google-business-profile-description',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'marketing'),
  (select id from public.content_types where slug = 'prompt'),
  'Generate an SEO-optimized Google Business description that ranks in local search.',
  'Your Google Business Profile description is one of the most important pieces of marketing copy you have. Most plumbers either leave it blank or write something generic. This prompt creates a description that includes your services, service area, and differentiators in a way that helps you rank in Google Maps.',
  'beginner',
  ARRAY['chatgpt', 'claude', 'gemini'],
  E'I need a Google Business Profile description for my plumbing company.\n\nBusiness name: [YOUR BUSINESS NAME]\nCity/area served: [YOUR SERVICE AREA]\nServices offered: [LIST YOUR MAIN SERVICES, e.g., "water heater repair, drain cleaning, sewer line replacement, bathroom remodels"]\nYears in business: [NUMBER]\nWhat makes us different: [e.g., "same-day service, licensed and insured, family-owned, 24/7 emergency"]\n\nWrite a Google Business description that:\n- Is under 750 characters (Google''s limit)\n- Naturally includes my city name and key services for SEO\n- Sounds professional but human\n- Includes a call to action at the end\n- Does NOT use generic filler phrases like "we pride ourselves on"',
  true, now(), 'published'
);

-- PROMPT: Estimate Email
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, llm_compatibility,
  prompt_text, is_verified, last_verified_at, status
) values (
  'Turn Job Notes Into a Professional Estimate Email', 'job-notes-to-estimate-email',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'estimating'),
  (select id from public.content_types where slug = 'prompt'),
  'Paste your rough job notes and get a clean, professional estimate email ready to send.',
  'After a site visit, most plumbers have messy notes about what needs to be done. This prompt turns those rough notes into a professional estimate email that builds trust and closes the job. It structures the information clearly, explains the work in customer-friendly language, and includes a clear next step.',
  'beginner',
  ARRAY['chatgpt', 'claude', 'gemini'],
  E'I just visited a customer''s home for a plumbing estimate. Here are my rough notes:\n\n[PASTE YOUR NOTES HERE — be as messy as you want. Example: "kitchen faucet leaking, needs new cartridge maybe whole faucet. also noticed supply lines under sink are old gate valves, should replace with quarter turns. customer also asked about adding a hose bib to the back of house. total labor probably 3-4 hours. faucet $180 supply, valves $60, hose bib $120 parts"]\n\nCustomer name: [NAME]\n\nTurn this into a professional estimate email that:\n- Greets the customer by name\n- Lists each item with a brief plain-English explanation of WHY it needs to be done\n- Shows parts and labor as line items\n- Includes a total\n- Has a clear call to action ("Reply to this email or call to schedule")\n- Sounds professional but not corporate\n- Mentions your warranty if applicable: [e.g., "1-year labor warranty on all work"]',
  true, now(), 'published'
);

-- PROMPT: Review Response
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, llm_compatibility,
  prompt_text, is_verified, last_verified_at, status
) values (
  'Respond to Google Reviews (Good and Bad)', 'respond-to-google-reviews',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'customer-service'),
  (select id from public.content_types where slug = 'prompt'),
  'Generate professional responses to Google reviews — both the 5-stars and the angry 1-stars.',
  'Responding to every Google review boosts your local SEO ranking. But most plumbers skip it because they do not know what to say, especially to negative reviews. This prompt handles both scenarios: grateful but not generic for good reviews, professional and de-escalating for bad ones.',
  'beginner',
  ARRAY['chatgpt', 'claude', 'gemini'],
  E'I need to respond to a Google review for my plumbing business "[YOUR BUSINESS NAME]".\n\nThe review says: "[PASTE THE REVIEW HERE]"\nStar rating: [1-5]\n\nWrite a response that:\n- Thanks them specifically for something they mentioned (not generic)\n- If positive: briefly reinforces what makes us good without being braggy, and invites them back\n- If negative: stays calm and professional, briefly addresses the concern, offers to make it right offline ("please call us at..."), does NOT get defensive or argue\n- Keeps it under 4 sentences\n- Sounds like a real business owner, not a PR team\n- Naturally mentions our service area [YOUR CITY] for SEO',
  true, now(), 'published'
);

-- PROMPT: Social Media Posts
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty, llm_compatibility,
  prompt_text, is_verified, last_verified_at, status
) values (
  'Generate a Week of Social Media Posts', 'week-of-social-media-posts',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'marketing'),
  (select id from public.content_types where slug = 'prompt'),
  'Get 5 ready-to-post social media updates for your plumbing business — no cringe, no fluff.',
  'Most plumbers know they should post on social media but stare at a blank screen with nothing to say. This prompt generates a full week of posts mixing educational tips, behind-the-scenes content, and soft promotion. The posts sound like a real plumber, not a marketing agency.',
  'beginner',
  ARRAY['chatgpt', 'claude', 'gemini'],
  E'I run a plumbing business called [YOUR BUSINESS NAME] in [YOUR CITY].\n\nGenerate 5 social media posts for this week (Monday through Friday) for Facebook and Instagram. Mix of:\n- 1 educational tip (something homeowners should know)\n- 1 behind-the-scenes or "day in the life" post\n- 1 seasonal/timely tip (current month: [MONTH])\n- 1 customer story or testimonial style (make it generic/fictional)\n- 1 soft promotion of a specific service: [SERVICE, e.g., "drain cleaning"]\n\nRules:\n- Each post should be 2-4 sentences max\n- Sound like a real plumber talking, not a marketing agency\n- Include a suggested image description for each\n- Include 3-5 relevant hashtags per post\n- No emojis in every sentence — keep it professional\n- Include [YOUR CITY] naturally in at least 2 posts for local SEO',
  true, now(), 'published'
);

-- WORKFLOW: Quote-to-Close
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty,
  steps, is_verified, last_verified_at, status
) values (
  'Quote-to-Close Follow-Up Workflow', 'quote-to-close-workflow',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'lead-generation'),
  (select id from public.content_types where slug = 'workflow'),
  'Automated 3-step follow-up sequence that turns sent quotes into booked jobs.',
  'Most plumbers send a quote and hope for the best. This workflow creates an automated follow-up sequence: a "just checking in" text at 48 hours, a value-add email at 5 days (with a seasonal tip related to their issue), and a final "last chance" message at 10 days. Uses Jobber or Housecall Pro for the trigger, ChatGPT for message generation, and Zapier to automate the sends.',
  'intermediate',
  '[
    {"step": 1, "title": "Set trigger in Jobber/Housecall Pro", "description": "Create a tag or status called ''Quote Sent'' that you apply when you send a quote. This is what triggers the automated follow-up sequence.", "tool": "Jobber or Housecall Pro"},
    {"step": 2, "title": "Connect to Zapier", "description": "Create a Zap that watches for the ''Quote Sent'' tag. When triggered, it waits 48 hours then sends a follow-up text via your business phone or SMS tool.", "tool": "Zapier ($20/mo)"},
    {"step": 3, "title": "Generate follow-up messages with ChatGPT", "description": "Use the VansList follow-up prompt to pre-generate 3 message templates: 48-hour text, 5-day email, and 10-day final message. Save these as templates in Zapier.", "tool": "ChatGPT ($20/mo)"},
    {"step": 4, "title": "Set up the 3-message sequence", "description": "In Zapier, create the sequence: Message 1 at 48hrs (friendly text), Message 2 at 5 days (email with seasonal tip), Message 3 at 10 days (last chance with small urgency). Each checks if the quote was already accepted before sending.", "tool": "Zapier"},
    {"step": 5, "title": "Test with a real quote", "description": "Send yourself a test quote, apply the tag, and verify all 3 messages fire correctly. Adjust timing and wording based on what feels right.", "tool": "All"}
  ]'::jsonb,
  true, now(), 'published'
);

-- AUTOMATION: Review Request Automation
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty,
  cost_display, cost_monthly,
  steps, is_verified, last_verified_at, status
) values (
  'Automatic Google Review Requests After Every Job', 'auto-review-requests',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'marketing'),
  (select id from public.content_types where slug = 'automation'),
  'Set-and-forget system that texts customers a review link 2 hours after you complete a job.',
  'This automation sends a text message with your Google review link to every customer 2 hours after you mark a job as complete. It runs entirely in the background — you never have to remember to ask for a review again. Most plumbers see their monthly review count double within 60 days.',
  'beginner',
  '$20/mo (Zapier) or free if using Jobber/HCP built-in',
  20,
  '[
    {"step": 1, "title": "Get your Google review link", "description": "Search for your business on Google, click ''Write a review'', and copy the URL. This is the direct link customers will use.", "tool": "Google"},
    {"step": 2, "title": "Set the trigger", "description": "In Jobber or Housecall Pro, the trigger is when a job status changes to ''Complete.'' If using Zapier, connect it to watch for this status change.", "tool": "Jobber/HCP or Zapier"},
    {"step": 3, "title": "Create the message", "description": "Write a short text: ''Hey [name], thanks for choosing [business]. If you had a good experience, would you mind leaving us a quick Google review? It really helps: [link]. Thanks! - [your name]''", "tool": "Any"},
    {"step": 4, "title": "Set 2-hour delay and send", "description": "Add a 2-hour delay after job completion so the customer has time to see the finished work. Then auto-send the text to the customer phone number on file.", "tool": "Zapier or built-in automation"},
    {"step": 5, "title": "Done — let it run", "description": "This runs forever in the background. Check monthly to see your review count climbing. Respond to every review that comes in using the VansList review response prompt.", "tool": "None"}
  ]'::jsonb,
  true, now(), 'published'
);

-- STACK: Solo Plumber AI Stack
insert into public.listings (
  title, slug, trade_id, task_id, content_type_id,
  summary, description, difficulty,
  cost_display, cost_monthly,
  is_stack, stack_total_monthly,
  is_verified, last_verified_at, is_featured, status
) values (
  'The Solo Plumber AI Stack', 'solo-plumber-ai-stack',
  (select id from public.trades where slug = 'plumber'),
  (select id from public.tasks where slug = 'admin-invoicing'),
  (select id from public.content_types where slug = 'stack'),
  'Complete AI toolkit for a one-person plumbing operation. 4 tools, $154/mo, replaces ~10 hours/week of admin.',
  E'This is the complete AI setup for a solo plumber or small 2-person team. It covers scheduling, estimating, marketing, and automation — the four areas where plumbers waste the most time on non-billable work.\n\nWhat you get:\n• Jobber AI ($39/mo) — Scheduling, dispatch, invoicing, and online booking. Your command center.\n• ChatGPT Plus ($20/mo) — Estimates, emails, social media posts, review responses. Your writing assistant.\n• NiceJob ($75/mo) — Automated Google review requests after every job. Your reputation builder.\n• Zapier ($20/mo) — Connects everything together. Triggers follow-ups, syncs data, automates the boring stuff.\n\nTotal: $154/mo\n\nWhat it replaces: approximately 10 hours per week of admin work including manual scheduling, writing estimates from scratch, remembering to ask for reviews, and following up on quotes.\n\nROI math: If your billable rate is $100/hour and you reclaim even 5 of those 10 hours for actual plumbing work, that is $2,000/month in recovered revenue for a $154 investment.',
  'beginner',
  '$154/mo total', 154,
  true, 154,
  true, now(), true, 'published'
);

-- After inserting the stack, update its stack_listing_ids
-- (In practice you'd do this with the actual UUIDs, but for seed data we'll leave it as a reference)
