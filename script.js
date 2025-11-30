// Supabase Setup
const supabaseUrl = "https://xzatttpouvlhqzbuwgmc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YXR0dHBvdXZsaHF6YnV3Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDIyMDQsImV4cCI6MjA3OTk3ODIwNH0.b_21iJwV6QrZ87xEVCxZxhwYGqvhBHMbm-W9Chu9RnE"; // Use your actual key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Load Gallery
async function loadGallery() {
    try {
        // Get list of images
        const { data, error } = await supabaseClient.storage.from("photos").list("", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" }
        });

        if (error) {
            console.error("Gallery Load Error:", error);
            return;
        }

        const galleryDiv = document.getElementById("gallery");
        galleryDiv.innerHTML = "";

        data.forEach(file => {
            const imgUrl =
                `${supabaseUrl}/storage/v1/object/public/photos/${file.name}`;

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = file.name;
            img.className = "gallery-image";

            galleryDiv.appendChild(img);
        });

    } catch (err) {
        console.error("Unexpected Error:", err);
    }
}

loadGallery();

