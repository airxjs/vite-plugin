interface TitleProps {
  text: string
}

function Title({ text }: TitleProps) {
  return () => <h1 style="color: #333">{text}</h1>
}

interface AppProps {
  name: string
}

export function App({ name }: AppProps) {
  const items = ['Item 1', 'Item 2', 'Item 3']

  return () => (
    <div style="padding: 20px; font-family: sans-serif">
      <>
        <Title text={`Hello from ${name}!`} />
        <p>Welcome to vite-plugin-airx</p>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    </div>
  )
}
