import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const event = readJson('data/event.json');
const schedule = readJson('data/schedule.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function readContent(kind, slug) {
  const source = fs.readFileSync(path.join(root, 'content', kind, `${slug}.md`), 'utf8');
  const frontMatter = source.split('+++')[1] ?? '';
  const title = frontMatter.match(/^title\s*=\s*"([^"]+)"/m)?.[1] ?? slug;
  const name = frontMatter.match(/^\s*name\s*=\s*"([^"]+)"/m)?.[1];
  const speakers = frontMatter.match(/^\s*speakers\s*=\s*\[([^\]]*)\]/m)?.[1] ?? '';
  return {
    title,
    name,
    speakers: [...speakers.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
  };
}

function absoluteUrl(pathname) {
  return new URL(pathname.replace(/^\//, ''), event.website).href;
}

const scheduled = schedule.days.flatMap((day) =>
  day.slots.flatMap((slot) =>
    slot.entries.filter((entry) => entry.ref).map((entry) => ({ ...entry, day: day.displayDate, time: slot.time }))
  )
);

const talks = scheduled
  .filter((entry) => entry.type === 'talk')
  .map((entry) => {
    const talk = readContent('talks', entry.ref);
    const speakers = talk.speakers.map((slug) => readContent('speakers', slug).name ?? slug);
    return `- [${talk.title}](${absoluteUrl(`/talks/${entry.ref}/`)}) — ${speakers.join(' and ')}; ${entry.day}, ${entry.time}`;
  });

const workshops = scheduled
  .filter((entry) => entry.type === 'workshop')
  .map((entry) => {
    const workshop = readContent('workshops', entry.ref);
    return `- [${workshop.title}](${absoluteUrl(`/workshops/${entry.ref}/`)}) — ${entry.day}, ${entry.time}`;
  });

const activities = scheduled
  .filter((entry) => entry.type === 'side-activity')
  .map((entry) => {
    const activity = readContent('activities', entry.ref);
    return `- [${activity.title}](${absoluteUrl(`/activities/${entry.ref}/`)}) — ${entry.day}, ${entry.time}`;
  });

const output = `# ${event.siteName}

> ${event.description}

${event.siteName} is an annual conference for the European Rust community. ${event.name} includes two conference days, workshops, community activities, and online participation.

## Event details

- Dates: October 14–17, 2026
- Conference days: October 15–16, 2026
- Location: ${event.location.name}, ${event.location.streetAddress}, ${event.location.postalCode} ${event.location.addressLocality}, Spain
- Format: Barcelona and online
- Website: [${event.website}](${event.website})
- [Schedule](${absoluteUrl('/schedule/')})
- [Tickets and registration](${event.ticketUrl})

## Talks and speakers

The schedule links each session to its speaker profile and full abstract.

${talks.join('\n')}

## Workshops

Workshops take place on October 14. Workshop venue details are still to be announced.

${workshops.join('\n')}

## Side activities

${activities.join('\n')}

## Venue and attendee information

- [Venue and travel](${absoluteUrl('/travel/')})
- [Code of Conduct](${absoluteUrl('/code-of-conduct/')})
- [Accessibility statement](${absoluteUrl('/accessibility/')})
- [Health and safety policy](${absoluteUrl('/health-safety-policy/')})
- [Cancellation policy](${absoluteUrl('/cancellation/')})

## Sponsorship

- [EuroRust 2026 sponsorship prospectus](${event.sponsorshipUrl})

## Contact

- Email: [mail@eurorust.eu](mailto:mail@eurorust.eu)
`;

fs.mkdirSync(path.join(root, 'public'), { recursive: true });
fs.writeFileSync(path.join(root, 'public', 'llms.txt'), output);
