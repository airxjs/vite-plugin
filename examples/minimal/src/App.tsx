import * as airx from 'airx'

interface TitleProps {
  text: string
}

function Title({ text }: TitleProps) {
  return () => airx.createElement('h1', { style: 'color: #333' }, text)
}

interface AppProps {
  name: string
}

export function App({ name }: AppProps) {
  const items = ['Item 1', 'Item 2', 'Item 3']

  return () =>
    airx.createElement(
      'div',
      { style: 'padding: 20px; font-family: sans-serif' },
      // Fragment usage: <>...</> maps to __airx__.Fragment via plugin config
      airx.createElement(
        () => airx.createElement(airx.Fragment, null, [
          airx.createElement(Title, { text: `Hello from ${name}!` }),
          airx.createElement('p', null, 'Welcome to vite-plugin-airx'),
          airx.createElement(
            'ul',
            null,
            items.map((item) =>
              airx.createElement('li', { key: item }, item)
            )
          ),
        ])
      )
    )
}
