// @utils/renderEmailHtml.ts

import type {ReactElement} from 'react';
import type {ReactDOMServerReadableStream} from 'react-dom/server';

async function readStream(readableStream: ReactDOMServerReadableStream) {
  const reader = readableStream.getReader();
  const chunks: AllowSharedBufferSource[] = [];

  while (true) {
    const {value, done} = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }

  return chunks.map((chunk) => new TextDecoder('utf-8').decode(chunk)).join('');
}

export async function renderEmailHtml(component: ReactElement) {
  // @see https://github.com/vercel/next.js/issues/43810#issuecomment-1462075524
  // Dynamically import ReactDOMServer to circumvent:
  // "Unable to import react-dom/server in a server component"
  const reactDOMServer = (await import('react-dom/server')).default;
  // Note: only available in platforms that support WebStreams
  // https://react.dev/reference/react-dom/server/renderToString#alternatives
  const renderToStream =
    reactDOMServer.renderToReadableStream ||
    reactDOMServer.renderToPipeableStream;

  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

  const readableStream = await renderToStream(component);
  const html = await readStream(readableStream);
  html
    // Remove leading doctype becuase we add it manually
    .replace(/^<!DOCTYPE html>/, '')
    // Remove empty comments to match the output of renderToStaticMarkup
    .replace(/<!-- -->/g, '');

  return `${doctype}${html}`;
}