Prestige Voices starter

Listen to a sample and make narration with your ElevenLabs account.

Add the chosen voice to My Voices first. Voice Library API access needs an eligible plan. Each generation uses your account credits.

Set ELEVENLABS_API_KEY and ACCESS_PASSWORD in your deployment environment. Use a unique random password of at least 24 characters. Never commit either value. The server accepts up to three generation requests per minute in each running instance. Serverless instances do not share this limit, so it is not a spending cap. Restrict access at your hosting provider before sharing the URL.

Select a voice and enter a script. Enter the access password to generate. A failed request may still have reached ElevenLabs. Check your history before trying again.

Run locally with npm install followed by npm run build.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbilbop1%2Fprestige-voices-starter&env=ELEVENLABS_API_KEY%2CACCESS_PASSWORD)
