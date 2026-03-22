# Mom's Birthday Surprise 🎁

A beautiful, modern, and responsive birthday surprise website for Mom, featuring a slideshow of memories, a particle network background, and background music.

## Features

- **Responsive Design**: Looks great on mobile, tablet, and desktop.
- **Slideshow**: Automatically cycles through your mom's photos.
- **Particle Network**: A beautiful, interactive particle effect similar to aqbit.in.
- **Background Music**: Plays a birthday song automatically (muted initially, user can unmute).
- **Glassmorphism**: Modern glassmorphism design with smooth transitions.
- **Start Screen**: A simple "Tap to Open" screen to handle audio autoplay policies.

## How to Use

1.  **Add Your Photos**: Place your mom's photos in the same folder as the `index.html` file.
2.  **Update `script.js`**:
    - Open `script.js`.
    - Find the `userImages` array.
    - Replace the example filenames with your actual filenames.
    ```javascript
    const userImages = [
        'mom1.jpg',
        'mom2.jpg',
        'mom3.jpg',
        // ... add all your photos
    ];
    ```
3.  **Add Music**:
    - Place your music file in the same folder.
    - Ensure it is named `song.mp3` or update the `src` in `index.html`.
    ```html
    <audio id="bg-music" loop>
        <source src="song.mp3" type="audio/mpeg">
    </audio>
    ```
4.  **Open in Browser**:
    - Open `index.html` in your web browser.
    - Click the "Tap to Open Your Surprise" button to start the experience.

## File Structure

```
Mom-Birthday-Surprise/
├── index.html              # Main HTML file
├── style.css               # CSS styles
├── script.js               # JavaScript logic
├── song.mp3                # Background music (optional)
├── Img1.jpg, Img2.jpg, ... # Your photos
└── README.md               # Project documentation
```

## Customization

- **Change Colors**: Edit the `--primary-color`, `--secondary-color`, and `--glass-bg` variables in `style.css`.
- **Change Text**: Modify the `<h1>` and `<p>` tags in `index.html`.
- **Change Transitions**: Adjust the `setInterval` delay in `script.js` or modify the transition classes.

## License

MIT
