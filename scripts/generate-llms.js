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
    return `- [${talk.title}](${absoluteUrl(`/talks/${entry.ref}/`)}): Talk by ${speakers.join(' and ')} on ${entry.day}, ${entry.time}.`;
  });

const workshops = scheduled
  .filter((entry) => entry.type === 'workshop')
  .map((entry) => {
    const workshop = readContent('workshops', entry.ref);
    return `- [${workshop.title}](${absoluteUrl(`/workshops/${entry.ref}/`)}): Workshop on ${entry.day}, ${entry.time}.`;
  });

const activities = scheduled
  .filter((entry) => entry.type === 'side-activity')
  .map((entry) => {
    const activity = readContent('activities', entry.ref);
    return `- [${activity.title}](${absoluteUrl(`/activities/${entry.ref}/`)}): Side activity on ${entry.day}, ${entry.time}.`;
  });

const output = `# ${event.siteName}

> ${event.description}

${event.siteName} is an annual conference for the European Rust community. ${event.name} runs from October 14–17, 2026, in Barcelona and online. Workshops and side activities begin on October 14. The conference takes place on October 15–16 at ${event.location.name}, ${event.location.streetAddress}, ${event.location.postalCode} ${event.location.addressLocality}, Spain. Community activities continue on October 17.

## Core event information

- [EuroRust website](${event.website}): Main website for ${event.name}, held in Barcelona and online from October 14–17, 2026.
- [Schedule](${absoluteUrl('/schedule/')}): Full schedule for workshops, talks, side activities, and community events.
- [Tickets and registration](${event.ticketUrl}): Ticket options and registration for on-site and online attendance.

## Talks and speakers

${talks.join('\n')}

## Workshops

${workshops.join('\n')}

## Side activities

${activities.join('\n')}

## Venue and attendee information

- [Venue and travel](${absoluteUrl('/travel/')}): Venue address, public transport, travel, accessibility, and visa information.
- [Code of Conduct](${absoluteUrl('/code-of-conduct/')}): Conduct requirements and anti-harassment policy for all participants.
- [Accessibility statement](${absoluteUrl('/accessibility/')}): Accessibility measures, ticket support, and contact information for assistance.
- [Health and safety policy](${absoluteUrl('/health-safety-policy/')}): Health and safety guidance for on-site attendees and participants.
- [Cancellation policy](${absoluteUrl('/cancellation/')}): Refund, ticket reassignment, and event cancellation terms.

## Sponsorship

- [EuroRust 2026 sponsorship prospectus](${event.sponsorshipUrl}): Sponsorship packages, benefits, pricing, and contact information.

## Contact

- [Email EuroRust](mailto:mail@eurorust.eu): Contact the organizers about attendance, accessibility, travel, visas, or sponsorship.
`;

fs.mkdirSync(path.join(root, 'public'), { recursive: true });
fs.writeFileSync(path.join(root, 'public', 'llms.txt'), output);
