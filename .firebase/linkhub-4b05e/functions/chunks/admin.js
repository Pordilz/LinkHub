import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import pkg from "firebase-admin";
const FB_PROJECT_ID = "linkhub-4b05e";
const FB_CLIENT_EMAIL = "firebase-adminsdk-fcu7j@linkhub-4b05e.iam.gserviceaccount.com";
const FB_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCil7oC+g1fHhfS\nuzV6B7Skli4tPUwrwUtiGHVMJx9rtW8hmMneP0Z5DHnxlmq+1p7um0XTVtEQ48sv\n0y0QUj/+F3GFMwjVW48kzoS2vpj8rQyifS2q25O8W+bocsZ24qygNQCejS9+YRFU\nQyR80Ap9ZwPnOejb6gRRuxT+KukZsjqkUtfkQQmF6TaAccNqmdlB+0tDJF8gQduS\nqOgDorjyCtUFizKJUqsiuGMdrRBtq9t4xafq0DCw+j9yqsOnqbsRXrWUzgN4XBQq\nhgtItN1bshUr1IjKuZXKfG86LY0ZBqU53OWDq13BuqDzcbZ95pQBvfB9/Y32RzxL\n3KZ5t++tAgMBAAECggEAFsdV7oPUqr4/DS1gHRQGSUam+nyLdtfSNVCC4mPawY6+\nHoFWyrWnrF7EmMV/d/P+eSQ0wJp5mLmpJi6aMh6ry2/CXixbsPRuVfQ+4JFMQp4F\n1p/d7YFsradcbrVhu5cfIyS5zPyvqi90K49qhbfpuE7d25+f0Wt0JnUkyET/ujMm\nV6+0aHHYW8EVRmO5RafXWGbIdNjdmZISZr/0xZuYw5t3JM45lAoGpKXDP6gRrw3E\n+Huc6xHslGHIRhUhdffxlPWrvhjaX1KqKWUIEn1e74pMer8y8CJfkdEBT/lp5WyF\n4oe18/+Ju6jHPnPOigtqraXYJgzpBB6kyNCxX3GoqwKBgQDRa2Sd0lAvzLEgjOK+\ngPgLIjOclxFvXZFlaE9fOJMYXLzmrUyzQUPDBEZKbAZbBbTUKekzIm0cbO8HFODZ\n1pSX0JR/kBTfQfU7wLWDYukTRW2rzH+edGL98X6eTYAIYoCjHa1+DRjOGi+cD4VZ\n6iKmT7AtFDAE6eFMaxeBxsefWwKBgQDGwfTDN94QOvhm75XjO/4mnYZi4oTSnIqu\nmpfkZfM4DB4pcoNFkm5UC8DaPXw8Dz7IV9Y9wJIK3/qHQz9hMP/1tdUGDb2MNUHu\nCMd/egTod5HFJS2xqFEqFZA4whwBS4OWe8bG3r2QG+itjpaqgxCujfk/bA9HlI5l\njkgH6CajlwKBgDM1ycL2HPmzWlUVXpUrQHyofmp6Xp8XCGj92vr0ALRiaScXlbv3\n57QWpYGpbNxxRsji/s2sS3Y6BTF8H4fleyysqsOO3ivCG0/jTf+0/j3iKnFqboK2\n/0YN+eKIHRjvzXkV1skONtSffqjw+rEEGjkFH5XGa/+nmZpwTa1EiKglAoGAWJGN\nlICMwAbHMneI/114f5Sqkd4G+iMv2WaiUPDtVQhxWF7jCFmcOG+UXKwRdGIGxBgA\nLDxn19i/Nw9Mau7+4GtKpgvxb008N+pJnBCvpzfBCWzr08MBiBNb1S8Kc7lGxgQa\nK/yN1G3bXZuwoAMPp/k0HIL2vBsC6VZh2sQkk7kCgYAcPXjgakOAq4MCBep+FFop\nWwIMEwqwsCU5+25JmsSHgI+XBFA+jjxdiy+tDG1ZDSmFQvRdPXL/z6QjSTXhKM7H\nldxnWaQb9jCyXtcULZyKune7gy9exBFkIl095Ntm1zXK7Ig+rNGHSRhOYbVRQmzh\nVtHrAHA6lLgVFFWiic1MVg==\n-----END PRIVATE KEY-----\n";
try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY
    })
  });
} catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error("Firebase Admin Error: ", err.stack);
  }
}
const adminDB = getFirestore();
const adminAuth = getAuth();
export {
  adminAuth as a,
  adminDB as b
};
