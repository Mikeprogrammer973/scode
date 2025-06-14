import { Alert } from "../util/global/alert";
import PatternSymbols from "../util/refs/pattern_symbols_refs";

export default function Documentation(): JSX.Element
{
  const examples: {explanation: string, pattern: string}[] = [
    {
      explanation: "Encodes the message in Morse code",
      pattern: "¬"
    },
    {
      explanation: "Encodes the message using the SCEnigma type",
      pattern: "?"
    },
    {
      explanation: "First, encode the message with the MutationTemplate.reciprocity type and then encode the previous encoding with the SCFrama type",
      pattern: "&§"
    },
    {
      explanation: "First, it encodes the message with the OrderTemplate.random type, then it encodes the previous encoding with the SCVigenère type and, finally, it passes the last encoding (the SCVigenère type) into the SCPolybe type",
      pattern: "°|#"
    }
  ]
  return (
    <div style={{fontFamily: "monospace"}} className="mx-auto max-w-7xl min-h-full flex items-center justify-between flex-wrap gap-5 p-6 md:px-8 text-lg text-gray-600 dark:text-gray-300">
        <details className="my-6 bg-slate-200 dark:bg-slate-700 p-5 rounded-lg">
          <summary className="text-xl font-bold cursor-pointer">Overview</summary>
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
          <summary  className="text-xl font-bold cursor-pointer">Encrypt</summary>
          <p className="px-4 py-2">
            Our platform offers multiple message encoding modes that, depending on your preference, can be used independently or, better yet, combined together.
          </p>
          <details className="px-4 py-2 ">
            <summary className="text-xl font-semibold  cursor-pointer">Cipher</summary>
            <details className="px-4 py-2 ">
              <summary className="text-xl font-semibold  cursor-pointer">Type</summary>
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
                          <p><strong>a_num:</strong> Creates a list of numbers representing the positions of letters in the alphabet (A=1, B=2, etc.).</p>
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
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">SCBinary</summary>
                <p className="px-4 py-2">The SCBinary class is a structure within a program that defines a specific type of encoding called "binary encoding".</p>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">How it works</summary>
                  <div className="px-4 py-2 ">
                    <p><strong>Class Creation</strong></p>
                    <p>This class is designed to handle the representation of information using a sequence of zeros (0) and ones (1), which are called binary digits. Each sequence of eight binary digits represents a specific character in binary encoding.</p>
                  </div>
                  <div className="px-4 py-2 ">
                    <p><strong>Symbol Initialization</strong></p>
                    <p>Inside the SCBinary class, there is a method called initSymbols. This method is responsible for initializing a list of symbols used in binary encoding. Each symbol is a predefined sequence of zeros and ones, such as "01000001" for the character "A".</p>
                  </div>
                  <details className="px-4 py-2 ">
                    <summary className="font-semibold text-lg  cursor-pointer">Application example</summary>
                    <div className="px-4 py-2 ">
                      <p>Suppose you need to send data from one computer to another. The SCBinary class would help transform this data into a sequence of zeros and ones that can be easily transmitted and interpreted by the other computer, ensuring that the data is received correctly.</p>
                    </div>
                  </details>
                </details>
              </details>
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">SCFrama</summary>
                <p className="px-4 py-2">The SCFrama class is like a toolbox in a computer project. It is used to deal with a special way of transforming letters into special symbols.</p>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">How it works</summary>
                  <div className="px-4 py-2 ">
                    <p><strong>Class Creation</strong></p>
                    <p>It works with a list of special symbols, such as "⁂", "⁋", "₹", and so on. These symbols are used to replace normal letters in messages.</p>
                  </div>
                  <div className="px-4 py-2 ">
                    <p><strong>Symbol Initialization</strong></p>
                    <p>When you use this class, a keyword (a string of letters) is generated. The class then looks at each letter of the keyword and turns it into a special symbol. For example, if the keyword is "abc", it could transform "a" into "⁂", "b" into "⁋", and "c" into "₹", using a pre-defined list of matches.</p>
                  </div>
                  <details className="px-4 py-2 ">
                    <summary className="font-semibold text-lg  cursor-pointer">Application example</summary>
                    <div className="px-4 py-2 ">
                      <p>Imagine you are creating a game or an app where characters need to send secret messages to each other. Instead of using normal letters that everyone understands, you use special symbols like those in the SCFrama class list to make messages more interesting and difficult for unauthorized people to read.</p>
                    </div>
                  </details>
                </details>
              </details>
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">SCNavajo</summary>
                <p className="px-4 py-2">The SCNavajo class handles a special form of encoding using Navajo words.</p>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">How it works</summary>
                  <div className="px-4 py-2 ">
                    <p><strong>Class Creation</strong></p>
                    <p>It organizes a list of Navajo words, such as "Wol-la-chee", "Shush", "Moasi", and so on. Each of these words represents a special symbol used in encoding.</p>
                  </div>
                  <div className="px-4 py-2 ">
                    <p><strong>Symbol Initialization</strong></p>
                    <p>When you use this class, it simply creates a list of these words. There is no complex transformation or calculation here, just defining the symbols that will be used elsewhere.</p>
                  </div>
                  <details className="px-4 py-2 ">
                    <summary className="font-semibold text-lg  cursor-pointer">Application example</summary>
                    <div className="px-4 py-2 ">
                      <p>For example, imagine a messaging app where users can choose to encode their messages using Navajo words instead of regular characters. This could be used to give a unique and culturally rich look to messages exchanged on the app.</p>
                    </div>
                  </details>
                </details>
              </details>
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">SCPolybe</summary>
                <p className="px-4 py-2">Encodes and decodes a message using a Polybius grid method.</p>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">Encode</summary>
                      <div className="px-4 py-2 ">
                        <ol style={{listStyleType: "number"}} className="list-inside">
                          <div>
                            <li className="font-semibold">
                              Random Grid Generation:
                            </li>
                            <ul  className="px-4 py-2 list-inside list-disc">
                              <li>First, it generates a random grid using a sequence of scrambled letters obtained from an alphabet reference.</li>
                              <li>The grid is organized in a row and column structure, where each cell contains a letter from the scrambled sequence.</li>
                            </ul>
                          </div>
                          <div>
                            <li className="font-semibold">
                              Message Encoding:
                            </li>
                            <ul className="px-4 py-2 list-inside list-disc">
                              <li>For each character in the input message, the function searches the grid for where that character is located and replaces it with a pair of numbers that represent the position of the row and column in the grid.</li>
                            </ul>
                          </div>
                          <div>
                            <li className="font-semibold">
                              Return of Results:
                            </li>
                            <ul className="px-4 py-2 list-inside list-disc">
                              <li>The function returns the encoded message, where each character has been replaced by the numbers that represent its position in the grid, and also the sequence of scrambled letters used to create the grid.</li>
                            </ul>
                          </div>
                        </ol>
                      </div>
                </details>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">Decode</summary>
                      <div className="px-4 py-2 ">
                        <ol style={{listStyleType: "number"}} className="list-inside">
                          <div>
                            <li className="font-semibold">
                              Grid Generation:
                            </li>
                            <ul  className="px-4 py-2 list-inside list-disc">
                              <li>First, it uses the scrambled letter sequence (obtained earlier during encoding) to generate the same grid used in encoding.</li>
                            </ul>
                          </div>
                          <div>
                            <li className="font-semibold">
                              Message Decoding:
                            </li>
                            <ul className="px-4 py-2 list-inside list-disc">
                              <li>For each pair of numbers in the encoded message, the function uses these numbers to find the corresponding letter in the grid and reconstructs it into the message's original form.</li>
                            </ul>
                          </div>
                          <div>
                            <li className="font-semibold">
                              Return of the Decoded Result:
                            </li>
                            <ul className="px-4 py-2 list-inside list-disc">
                              <li>The function returns the decoded message, where the number pairs have been converted back to the original characters using the generated grid.</li>
                            </ul>
                          </div>
                        </ol>
                      </div>
                </details>
              </details>
              <details className="px-4 py-2 ">
                <summary className="font-semibold text-lg  cursor-pointer">SCVigenère</summary>
                <p className="px-4 py-2">The SCVigenere class implements an encryption method called Vigenère.</p>
                <div className="px-4 py-2">
                  <p><strong>Class Creation</strong></p>
                  <ul  className="px-4 py-2 list-inside list-disc">
                    <li>When an SCVigenere object is created, it receives two parameters: key (the encryption key - randomly generated) and msg (the message to be encoded or decoded).</li>
                    <li>The key is adjusted to be the same length as the message (msg) repeating it if necessary.</li>
                  </ul>
                </div>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">Encode</summary>
                      <div className="px-4 py-2 ">
                        <ul  className="px-4 py-2 list-inside list-disc">
                            <li>This method encodes the message (msg) using the provided key.</li>
                            <li>It maps each letter in the original message to a new letter, determined by the position of the letter in the original message plus the corresponding position in the key in the alphabet reference.</li>
                        </ul>
                      </div>
                </details>
                <details className="px-4 py-2 ">
                  <summary className="font-semibold text-lg  cursor-pointer">Decode</summary>
                      <div className="px-4 py-2 ">
                        <ul  className="px-4 py-2 list-inside list-disc">
                            <li>This method decodes the encoded message back to the original message.</li>
                            <li>It maps each letter in the encoded message to a new letter, determined by the position of the letter in the encoded message subtracted from the corresponding position in the key in the alphabet reference.</li>
                        </ul>
                      </div>
                </details>
              </details>
              <details className="px-4 py-2">
                <summary className="font-semibold text-lg  cursor-pointer">SCEnigma</summary>
                <p className="px-4 py-2">The SCEnigma class is a modern implementation of the famous Enigma machine used during World War II for message encryption. This implementation simulates the operation of the main components of the Enigma machine.</p>
                <details className="px-4 py-2">
                  <summary className="font-semibold text-lg  cursor-pointer">Main Components</summary>
                  <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Rotors (SCECRotor):
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>Rotors are discs that perform letter substitutions according to an internal configuration. Each rotor has a ring of scrambled letters and an advance mechanism.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Reflector (SCECReflector):
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The reflector redirects the signal back through the rotors, allowing for symmetrical ciphering. That is, the same configuration can be used to encode and decode.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Plugboard (SCECPlugboard):
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The plugboard allows the exchange of pairs of letters before and after the signal passes through the rotors, adding an extra layer of complexity to the cipher.</li>
                      </ul>
                    </div>
                  </ol>
                </details>
                <details className="px-4 py-2">
                  <summary className="font-semibold text-lg  cursor-pointer">How it works</summary>
                  <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        One Letter Entry:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The input letter is first changed on the plugboard.</li>
                        <li>The letter is then converted to a number (A=0, B=1, etc.).</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Passage through the Rotors:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The number passes through the rotors from left to right, where it is replaced according to the internal configuration of each rotor.</li>
                        <li>The number then passes through the reflector, which redirects the signal back through the rotors in reverse order (right to left).</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Output and Plugboard:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The number is converted back to a letter.</li>
                        <li>The letter go through the plugboard again for the final change.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Rotor Advancement:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The first rotor advances one position for each coded letter.</li>
                        <li>If the first rotor reaches a specific position, it moves the next rotor forward, and so on, similar to an odometer.</li>
                      </ul>
                    </div>
                  </ol>
                </details>
                <details className="px-4 py-2">
                  <summary className="font-semibold text-lg  cursor-pointer">Encode</summary>
                  <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Rotor Configuration:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>Ten rotors are created, each with a random configuration of letters.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Reflector Configuration:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>A reflector with a specific configuration is created.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Plugboard Configuration:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The plugboard is configured without changing letters (empty).</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Message Encryption:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The message is encoded using the configured Enigma machine.</li>
                      </ul>
                    </div>
                  </ol>
                </details>
                <details className="px-4 py-2">
                  <summary className="font-semibold text-lg  cursor-pointer">Decode</summary>
                  <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Rotor Reset:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The rotors are reset to the home position.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Message Decoding:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The encrypted message is decoded using the same configuration of rotors, reflector and plugboard.</li>
                      </ul>
                    </div>
                  </ol>
                </details>
              </details>
              <details  className="px-4 py-2">
                <summary className="text-lg font-bold cursor-pointer">MutationTemplate</summary>
                <p className="px-4 py-2">The MutationTemplate class offers two different ways of transforming messages: reciprocity and decalation. Both techniques alter the original message in different ways.</p>
                <details className="px-4 py-2">
                  <summary className="text-lg font-bold cursor-pointer">Reciprocity</summary>
                  <div className="px-4 py-2">
                    <p>Transforms the message in a specific way:</p>
                    <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Definition:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>It takes each letter in the message and replaces it with the opposite letter in the alphabet. For example, 'A' becomes 'Z', 'B' becomes 'Y', and so on.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        How it works:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>For each letter in the message, the function finds the position of that letter in the alphabet.</li>
                        <li>The function then calculates the position of the opposite letter (26 - original letter position - 1).</li>
                        <li>Finally, it replaces the original letter with the corresponding opposite letter and constructs the new transformed message.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Example:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>If the original message is "HELLO", the transformation results in "SVOOL".</li>
                      </ul>
                    </div>
                  </ol>
                  </div>
                </details>
                <details className="px-4 py-2">
                  <summary className="text-lg font-bold cursor-pointer">Decalation</summary>
                  <div className="px-4 py-2">
                    <p>Shifts the letters of the original message:</p>
                    <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Definition:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>It shifts each letter of the message forward or backward in the alphabet by a randomly determined (or specified) number of positions.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        How it works:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The function generates a random number between 1 and 24, which determines how many positions each letter will be moved. This number is called "decalage".</li>
                        <li>For each letter in the message, the function finds the position of that letter in the alphabet.</li>
                        <li>If it is not reversing the message, it adds the decal number to the original letter position. If it is reversing, it subtracts the decal number.</li>
                        <li>If the resulting position goes beyond the end of the alphabet, it returns to the beginning; if it is negative, it comes back from the end of the alphabet.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Example:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>If the original message is "HELLO" and the decal number is 3, the transformation results in "KHOOR" moving forward.</li>
                      </ul>
                    </div>
                  </ol>
                  </div>
                </details>
              </details>
              <details  className="px-4 py-2">
                <summary className="text-lg font-bold cursor-pointer">OrderTemplate</summary>
                <p className="px-4 py-2">The OrderTemplate class offers two methods for reordering a message: inversion and random shuffling.</p>
                <details className="px-4 py-2">
                  <summary className="text-lg font-bold cursor-pointer">Reverse</summary>
                  <div className="px-4 py-2">
                    <p>Reverses the order of characters in the message:</p>
                    <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Definition:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>It takes a message and returns a new message with the characters in reverse order.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        How it works:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The function cycles through the original message backwards.</li>
                        <li>For each character, it adds that character to the new message.</li>
                        <li>The result is a message where the first character of the original is the last and vice versa.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Example:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>If the original message is "HELLO", the reversed message will be "OLLEH".</li>
                      </ul>
                    </div>
                  </ol>
                  </div>
                </details>
                <details className="px-4 py-2">
                  <summary className="text-lg font-bold cursor-pointer">Random</summary>
                  <div className="px-4 py-2">
                    <p>Shuffles message characters according to a scrambled alphabet reference:</p>
                    <ol className="list-inside" style={{listStyleType: "numbers"}}>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Definition:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>It takes a message and replaces each character with a corresponding character in a scrambled version of the alphabet.</li>
                        <li>The function can also reverse this transformation if the original alphabet reference is provided.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        How it works:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>The function generates a scrambled version of the alphabet if it is not reversing.</li>
                        <li>For each character in the message, it finds the position of that character in the normal alphabet.</li>
                        <li>The function then replaces the original character with the character in the same position in the scrambled version of the alphabet.</li>
                        <li>If it is reversing, it does the reverse process, using the reference provided.</li>
                      </ul>
                    </div>
                    <div className="px-4 py-2">
                      <li className="font-semibold">
                        Example:
                      </li>
                      <ul className="list-inside list-disc px-4 py-2">
                        <li>If the original message is "HELLO" and the scrambled alphabet is "QWERTYUIOPASDFGHJKLZXCVBNM", the scrambled message might be something like "ITSSG" if the normal alphabet is mapped to the scrambled one.</li>
                      </ul>
                    </div>
                  </ol>
                  </div>
                </details>
              </details>
            </details>
            <details className="px-4 py-2 ">
              <summary className="text-xl font-semibold  cursor-pointer">Pattern</summary>
              <p className="px-4 py-2 ">A coding pattern is the combination of one or more symbols.</p>
              <details className="px-4 py-2 ">
                <summary className="text-lg font-semibold  cursor-pointer">Symbols</summary>
                <p className="px-4 py-2 ">
                  Each type of cipher is referenced by a specific symbol. And it is from these symbols that coding patterns are formed.
                  Here are these symbols:
                </p>
                <div className="overflow-x-scroll">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-4 my-2">
                    <thead className="text-xs text-gray-100 uppercase bg-gray-400 dark:bg-gray-500 dark:text-gray-200">
                      <tr className="">
                        <th scope="col" className="px-6 py-3">Class</th>
                        <th scope="col" className="px-6 py-3">Symbol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        PatternSymbols.all().map((symbol, i) =>{
                          return <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-300 even:dark:bg-gray-800 border-b dark:border-gray-700" key={symbol}>
                            <td className="px-6 py-4" key={i+1}> {PatternSymbols.all_names()[i]} </td>
                            <td className="px-6 py-4" key={i+2}> {symbol} </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </details>
              <details className="px-4 py-2 ">
                <summary className="text-lg font-semibold  cursor-pointer">Pattern construction</summary>
                <p className="px-4 py-2 ">
                  As mentioned before, a pattern is a combination of one or several symbols. Here are some examples:
                </p>
                <div className="overflow-x-scroll mx-4 my-2">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-4 my-2">
                    <thead className="text-xs text-gray-100 uppercase bg-gray-400 dark:bg-gray-500 dark:text-gray-200">
                      <tr className="">
                        <th scope="col" className="px-6 py-3">Explanation</th>
                        <th scope="col" className="px-6 py-3">Pattern</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        examples.map((exp, i) =>{
                          return <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-300 even:dark:bg-gray-800 border-b dark:border-gray-700" key={i}>
                            <td className="px-6 py-4" key={i+1}> {exp.explanation} </td>
                            <td className="px-6 py-4" key={i+2}> {exp.pattern} </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 ">
                <div className={"bg-orange-100 border-t-4 border-orange-500 rounded-b text-orange-900 px-4 py-3 shadow-md overflow-x-scroll"} role="alert">
                  <div className="flex">
                        <div className="py-1"><svg className={"fill-current h-6 w-6 text-red-500 mr-4"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                          <div>
                              <p className="font-bold text-xl"> Attention </p>
                              <div className="text-sm"> 
                              <div>
                                <p className="py-2 font-semibold">Some symbols can only be placed at the end of patterns, that is, an error will be generated if they are placed in the middle of others.</p>
                                <div className="">
                                  <table className="w-full text-sm text-left rtl:text-right text-red-500 dark:text-red-400">
                                    <thead className="text-xs text-red-100 uppercase bg-red-400 dark:bg-red-500 dark:text-red-200">
                                      <tr className="">
                                        <th scope="col" className="px-6 py-3">Class</th>
                                        <th scope="col" className="px-6 py-3">Symbol</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        PatternSymbols.all().map((symbol, i) =>{
                                          if(PatternSymbols.global().indexOf(symbol) == -1)
                                          {
                                            return <tr className="odd:bg-white odd:dark:bg-red-900 even:bg-red-300 even:dark:bg-red-800 border-b dark:border-red-700" key={symbol}>
                                              <td className="px-6 py-4" key={i+1}> {PatternSymbols.all_names()[i]} </td>
                                              <td className="px-6 py-4" key={i+2}> {symbol} </td>
                                            </tr>
                                          }
                                        })
                                      }
                                    </tbody>
                                  </table>
                                </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </details>
          </details>
        </details>

        <details className=" my-6 bg-slate-200 dark:bg-slate-700 p-5 rounded-lg">
          <summary  className="text-xl font-bold cursor-pointer">Decrypt</summary>
          <p className="px-4 py-2 ">Each encoding generated here on our platform is followed by a document containing the settings to decode it.</p>
          <details className="px-4 py-2 ">
            <summary className="text-xl font-bold cursor-pointer">Tutorial</summary>
            <p className="px-4 py-2 ">
              For decoding, follow the following steps:
            </p>
            <div>
              <ol className="list-inside px-4 py-2" style={{listStyleType: "number"}}>
                <li><strong>Place the encrypted message in the first text box.</strong></li>
                <li><strong>Place the configuration parameters in the second box (if not, leave it empty).</strong></li>
                <li><strong>Finally, place the pattern (the one used to encode the message) in the last text box and click the "Decrypt message" button to begin the decoding process.</strong></li>
              </ol>
            </div>
          </details>
        </details>
    </div>
  )
}