function cleanPlainText(text) {
  if (!text) return "";
  return text
    .replace(/[*#$`~_]/g, "") // Hapus karakter markdown *, #, $, `, ~, _
    .replace(/^\s*[-+]\s+/gm, "• ") // Ubah list markdown jadi poin lingkaran sederhana
    .replace(/\n{3,}/g, "\n\n") // Rapikan baris kosong berlebih
    .trim();
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || !message.trim()) {
      return Response.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey.includes("YOUR_GEMINI_API_KEY")) {
      return Response.json({
        response: `[AI AR1 STANDBY] Halo! Saya AI AR1 yang dikembangkan oleh Kelas 12 RPL 1. API Key Gemini belum dipasang di file .env.local.\n\nSilakan masukkan GEMINI_API_KEY kamu di file .env.local untuk mengaktifkan kecerdasan buatan secara penuh! (Dapatkan gratis di https://aistudio.google.com/apikey)`,
        timestamp: new Date().toISOString(),
      });
    }

    const cleanKey = apiKey.trim();

    const systemPrompt = `Kamu adalah AI - AR1 (Antares RPL 1 AI Assistant), asisten AI dari Kelas 12 RPL 1.
ATURAN UTAMA JAWABAN:
1. Berikan jawaban yang SINGKAT, RINGKAS, MINIMALIS, dan to-the-point (maksimal 2-4 kalimat).
2. DILARANG MENGGUNAKAN format markdown sama sekali (JANGAN gunakan bintang *, pagar #, dollar $, backtick \`, underscore _, atau simbol dekoratif).
3. Gunakan teks polos (plain text) biasa yang bersih dan mudah dibaca di dalam layar terminal console.`;

    const fullPrompt = `${systemPrompt}\n\nPertanyaan: ${message.trim()}`;

    // Standard Gemini model identifiers
    const modelsToTry = [
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-3.6-flash',
      'gemini-2.5-flash'
    ];

    let lastErrorMessage = '';
    
    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }]
          })
        });

        const data = await res.json();

        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const rawText = data.candidates[0].content.parts[0].text;
          const cleanedText = cleanPlainText(rawText);
          
          return Response.json({
            response: cleanedText,
            timestamp: new Date().toISOString(),
          });
        }

        if (data?.error?.message) {
          lastErrorMessage = `[${model}] ${data.error.message}`;
        }
      } catch (err) {
        lastErrorMessage = `[${model}] ${err.message}`;
      }
    }

    return Response.json(
      { error: `Gemini API Error: ${lastErrorMessage}` },
      { status: 500 }
    );
  } catch (error) {
    return Response.json(
      { error: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
