import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AnimatedCursor } from './components/CustomCursor';




function App() {

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={24} // Adjusted for a more prominent ring effect
        color='193, 11, 111'
        outerAlpha={1} // Solid color for the ring border
        innerScale={0.7}
        outerScale={1.5} // Adjusted outer scale for a subtle hover effect
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
          {
            target: '.custom',
            options: {
              innerSize: 12,
              outerSize: 30,
              color: '255, 255, 255',
              outerAlpha: 1,
              innerScale: 0.7,
              outerScale: 1.5
            }
          }
        ]}
      />

      {/* Tailwind CSS styling for the page layout */}
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-inter">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-lg mx-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-purple-400">
            Animated Cursor Example
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Move your cursor around to see the custom animated effect. Hover over the links, buttons, and input fields to see the cursor change.
          </p>

          <div className="flex flex-col space-y-4">
            <a href="#" className="link text-purple-300 hover:text-purple-200 transition-colors duration-200">
              Hover over me (Link)
            </a>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200">
              Click me (Button)
            </button>
            <input type="text" placeholder="Type here" className="rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="custom bg-purple-900 text-purple-100 p-4 rounded-lg cursor-pointer">
              <span className="font-bold">Custom Target</span><br />
              (Hover to see a different cursor)
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold">Hi</h1>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </>
  )
}

export default App
