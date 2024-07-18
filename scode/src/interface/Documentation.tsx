
export default function Documentation(): JSX.Element
{
  return (
    <div style={{fontFamily: "monospace"}} className="mx-auto max-w-7xl p-6 md:px-8 text-lg text-gray-600 dark:text-gray-300">
        <details className="my-6 bg-slate-200 dark:bg-slate-700 p-5 rounded-lg">
          <summary className="text-xl font-bold">Overview</summary>
          <p className="px-4 py-2">
            Welcome to our website, a platform dedicated to converting messages using different types of manual coding. Our service is designed for those who want to transform messages into traditional, easy-to-understand codes, ensuring safe and fun communication.
          </p>
          
          <details className="px-4 py-2 ">
            <summary className="text-xl font-semibold  cursor-pointer">Main Features</summary>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">Message Encoding</summary>
              <p className="px-4 py-2">Convert your messages into manual codes like Morse code. Our simple interface allows you to quickly encode messages, making them understandable only to those who know the encoding used.</p>
            </details>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">Message Decoding</summary>
              <p className="px-4 py-2">Conveniently decrypt encoded messages back to their original format. If you receive a message in Morse code, for example, our website helps translate it into readable text.</p>
            </details>
          </details>
          <details className="px-4 py-2 ">
            <summary className="text-xl font-semibold  cursor-pointer">How it works</summary>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">Intuitive Interface</summary>
              <p className="px-4 py-2">Our user-friendly interface makes the message encoding and decoding process easier. With just a few clicks, you can turn text into code and vice versa.</p>
            </details>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">Manual Codings</summary>
              <p className="px-4 py-2">Support for different types of manual coding. Ideal for enthusiasts of traditional encryption and secure communication.</p>
            </details>
          </details>
          <details className="px-4 py-2 ">
            <summary className="text-xl font-semibold  cursor-pointer">Technologies Used</summary>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">React.js</summary>
              <p className="px-4 py-2">React.js technology provides a dynamic and responsive user experience, making interacting with our encoding and decoding tools fast and enjoyable.</p>
            </details>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">Conversion Algorithms</summary>
              <p className="px-4 py-2">We implement efficient algorithms to convert messages into manual codes and decode them back to their original format.</p>
            </details>
          </details>
        </details>

        <details className=" my-6 bg-slate-200 dark:bg-slate-700 p-5 rounded-lg">
          <summary  className="text-xl font-bold">Encrypt</summary>
          <p className="px-4 py-2">
            Our platform offers multiple message encoding modes that, depending on your preference, can be used independently or, better yet, combined together.
          </p>
          <details className="px-4 py-2 ">
            <summary className="text-xl font-semibold  cursor-pointer">Ciphers type</summary>
            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">SCSimply</summary>
              <p className="px-4 py-2">The SCSimply class is part of a system that encodes messages. Depending on the chosen coding level, it transforms messages in different ways. Let's explore how this class works and what each part does.</p>
              <details className="px-4 py-2">
                <summary className="font-semibold text-lg  cursor-pointer">Coding Levels</summary>
                <div className="px-4 py-2">
                  SCSimply can encode messages at three different levels:
                  <p className="px-4 py-2"><strong>key:</strong> Represents uppercase letters of the alphabet in ASCII values ​from 65 to 90 (A-Z).</p>
                  <p className="px-4 py-2"><strong>key_m:</strong> Switches between capital letters A to Z (65 to 90) and Z to A (90 to 65).</p>
                  <p className="px-4 py-2"><strong>a_num:</strong> Represent each letter of the alphabet by a number.</p>
                </div>
                <details className="px-4 py-2">
                  <summary className="font-semibold text-lg  cursor-pointer">SCSimply Class Operation</summary>
                  <div className="px-4 py-2">
                    <div className="px-4 py-2">
                      <p><strong>Class Creation</strong></p>
                      <p>When we create a new SCSimply, we choose a coding level (one of the three mentioned above). The class then prepares to transform messages according to this level.</p>
                    </div>
                    <div className="px-4 py-2">
                      <p><strong>Symbol Initialization</strong></p>
                      <p>SCSimply needs to know which symbols to use to encode messages. Depending on the chosen level, it generates different sets of symbols:</p>
                      <div className="px-4 py-2">
                        <p><strong>key:</strong> Creates a list of letters from A to Z (65 to 90).</p>
                        <p><strong>key_m:</strong> Creates a pattern that alternates between letters A to Z(65 to 90) and Z to A(90 to 65).</p>
                        <p><strong>a_num:</strong>: Creates a list of numbers representing the positions of letters in the alphabet (A=1, B=2, etc.).</p>
                      </div>
                    </div>
                  </div>
                  <details className="px-4 py-2">
                    <summary className="font-semibold text-lg  cursor-pointer">Detailed Examples</summary>
                    <div className="px-4 py-2">
                      <p><strong>key level</strong></p>
                      <p>
                        For the key level, the class generates a list of uppercase letters of the alphabet. For example:
                        A, B, C, ..., Z(65, 66, 67, ..., 90)
                      </p>
                    </div>
                    <div className="px-4 py-2">
                      <p><strong>key_m level </strong></p>
                      <p>
                        For the key_m level, the class combines letters of the alphabet in order and in reverse order. For example: AA, BB, CC, ..., ZZ | ZA, YB, XC, ..., AZ
                      </p>
                    </div>
                    <div className="px-4 py-2">
                      <p><strong>a_num level </strong></p>
                      <p>
                        For the a_num level, the class transforms each letter of the alphabet into a corresponding number. For example:
                        A=1, B=2, C=3, ..., Z=26
                      </p>
                    </div>
                  </details>
                </details>
              </details>
            </details>

            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">SCMorse</summary>
              <p className="px-4 py-2">The SCMorse class encodes messages in Morse code. Let's explore how this class works and what each part does.</p>
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">How the SCMorse Class Works</summary>
                <div className="px-4 py-2 ">
                  <p><strong>Class Creation</strong></p>
                  <p>When we create a new SCMorse, the class prepares to transform messages into Morse code. This is done by calling the initSymbols method during class instance creation.</p>
                </div>
                <div className="px-4 py-2 ">
                  <p><strong>Symbol Initialization</strong></p>
                  <p>SCMorse needs to know which symbols to use to encode messages. These symbols are the Morse codes corresponding to the letters of the alphabet.</p>
                </div>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">Usage Examples</summary>
                  <p className="px-4 py-2 ">Imagine we want to use SCMorse to encode a message. The class already knows how to turn each letter of the alphabet into Morse code. For example, <em>the letter "A" is transformed into ".-", the letter "B" into "-..."</em>, and so on.</p>
                </details>
              </details>
            </details>

            <details className="px-4 py-2 ">
              <summary className="font-semibold text-lg  cursor-pointer">SCBacon</summary>
              <p className="px-4 py-2">The SCBacon class encodes messages using the Bacon cipher. Let's explore how this class works and what each part does.</p>
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">Operation of the SCBacon Class</summary>
                <div className="px-4 py-2 ">
                  <p><strong>Class Creation</strong></p>
                  <p>When we create a new SCBacon, the class prepares to transform messages using the Bacon cipher. This is done by calling the initSymbols method during class instance creation.</p>
                </div>
                <div className="px-4 py-2 ">
                  <p><strong>Symbol Initialization</strong></p>
                  <p>SCBacon needs to know which symbols to use to encode messages. These symbols are sequences of five letters (A or B) that represent the letters of the alphabet.</p>
                </div>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">Usage Examples</summary>
                  <div className="px-4 py-2 ">
                    <p>Imagine we want to use SCBacon to encode a message. The class already knows how to transform each letter of the alphabet into a sequence of five letters (A or B). For example:</p>
                    <ul className="list-inside list-disc px-4 py-2">
                      <li>A = 'AABAA'</li>
                      <li>B = 'AABAB'</li>
                      <li>C = 'AABBA'</li>
                      <li>...</li>
                    </ul>
                    <p>Each letter of the alphabet is replaced by one of these sequences to encode the message.</p>
                  </div>
                </details>
              </details>
            </details>
          </details>
        </details>

        <details className=" my-6 bg-slate-200 dark:bg-slate-700 p-5 rounded-lg">
          <summary  className="text-xl font-bold">Decrypt</summary>
        </details>
    </div>
  )
}