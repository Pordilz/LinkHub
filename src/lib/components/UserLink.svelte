<script>
  // Exporting variables for icon, URL, and title
  export let icon = 'default'; // Icon filename
  export let url = 'hub'; // URL link
  export let title = 'some cool title'; // Title text
</script>

<!-- Anchor element styled as a button -->
<a href={url} class="stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose no-underline">
<!-- Image element displaying the icon with alt text -->
<img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
<!-- Text span for displaying the title -->
<span class="text-lg text-white font-bold">{title}</span>
</a>