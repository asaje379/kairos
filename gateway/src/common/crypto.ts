import { privateDecrypt, publicEncrypt } from 'crypto';

export function generateKeyPair() {
  const { generateKeyPairSync } = require('crypto');

  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  const publicKeyBase64 = new TextEncoder()
    .encode(publicKey.toString('base64'))
    .toString();
  const privateKeyBase64 = privateKey.toString('base64');

  return { publicKey: publicKeyBase64, privateKey: privateKeyBase64 };
}

export function encrypt<T>(publicKey: string, data: T) {
  const encrypted = publicEncrypt(
    publicKey,
    Buffer.from(JSON.stringify({ data })),
  );
  return encrypted.toString('base64');
}

export function decrypt<T>(privateKey: string, data: string) {
  try {
    const message = Buffer.from(data, 'base64');
    const decrypted = privateDecrypt(privateKey, message).toString();
    const result = JSON.parse(decrypted) as { data: T };
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
