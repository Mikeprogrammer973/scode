# Função `encrypt_msg`

A função `encrypt_msg` criptografa uma mensagem de acordo com um padrão fornecido. Ela suporta múltiplos métodos de criptografia, aplicando-os sequencialmente conforme definido pelo padrão.

## Parâmetros

- `pattern` (string): Uma string contendo símbolos, onde cada símbolo representa um método de criptografia específico.
- `msg` (string): A mensagem que será criptografada.

## Retorno

- Um objeto com as seguintes propriedades:
  - `crypted_msg` (string): A mensagem criptografada.
  - `decrypt_config` (string | null): Configuração necessária para descriptografar a mensagem, ou `null` se não houver configuração específica.
  - `msg` (string): A mensagem original.

## Exemplo de Uso

```javascript
import encrypt_msg from './caminho/para/o/arquivo';

const pattern = "$@#";
const message = "Hello, World!";
const result = encrypt_msg(pattern, message);

console.log(result.crypted_msg); // Mensagem criptografada
console.log(result.decrypt_config); // Configuração de descriptografia
console.log(result.msg); // Mensagem original

```

# Função `decrypt_msg`

A função `decrypt_msg` descriptografa uma mensagem de acordo com um padrão e configuração fornecidos. Ela suporta múltiplos métodos de descriptografia, aplicando-os sequencialmente conforme definido pelo padrão.

## Parâmetros

- `pattern` (string): Uma string contendo símbolos, onde cada símbolo representa um método de criptografia específico.
- `config` (string | null): Configuração necessária para descriptografar a mensagem, ou `null` se não houver configuração específica.
- `msg` (string): A mensagem que será descriptografada.

## Retorno

- Um elemento JSX que exibe a mensagem descriptografada ou uma mensagem de erro caso a descriptografia não seja bem-sucedida.

## Exemplo de Uso

```javascript
import decrypt_msg from './caminho/para/o/arquivo';

const pattern = "$@#";
const config = "configuração correspondente";
const message = "Mensagem criptografada";
const result = decrypt_msg(pattern, config, message);

// Renderiza o resultado em um componente React

