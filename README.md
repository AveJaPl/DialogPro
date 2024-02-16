# DialogPro

---
## Introduction
Welcome to DialogPro, a versatile and user-friendly chatbot interface designed for seamless integration into your applications. Developed using React with Vite and TypeScript, this project offers a robust foundation for creating interactive, real-time chat experiences. Whether you're looking to enhance customer service, streamline communication, or simply add a dynamic element to your project, DialogPro is ready to meet your needs.


## Key Features
**React with Vite and TypeScript:** A powerful combination of technologies that allows for rapid development and easy maintenance.

**Stylish Icons with React Icons:** A library of icons for React.

**Powerful Hooks with React Use:** A library of hooks for React.

## Getting Started

---

### Installation
Clone the repository and install dependencies.

```
git clone https://github.com/AveJaPl/DialogPro.git
cd dialogpro
npm i
```

### Before you start
You will need to create Logo directory in the `src` folder and add your logo to it. You will also need to generate a ssl certificate and key for the server. You can do this by running the following commands in the root directory of the project:
```
mkcert -install
```
If needed, rename the generated files to `key.pem` and `cert.pem` and move them to root directory of the project.

### Troubles with certificates

---
To generate the certificates, you need to have mkcert installed.

#### Windows
```
choco install mkcert
```

#### MacOS
```
brew install mkcert
```

#### Linux
```
sudo apt install libnss3-tools
```

## Production
Build the app for production with minification.

```
npm run build
```

## Customization
This Chatbot is designed for flexibility and ease of use. You can customize it to suit your needs by modifying the css files in the `src/styles` directory. You can also modify the chatbot's behavior by editing the `src/components/Chatbot.tsx` file.

## Server Compatibility
This interface is optimized for use with a dedicated server found in my repositories. It's specifically tailored to work seamlessly with this server, providing a comprehensive chatbot experience.

### Interested in my server?
This chatbot is automatically connected to my dedicated server. If you are interested in using my server, please contact me. I will send you pricing and other details.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
___
Thank you for choosing DialogPro for your project. I hope you enjoy using it as much as I enjoyed creating it. If you have any questions or concerns, please don't hesitate to contact me. I look forward to hearing from you!
