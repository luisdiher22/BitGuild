// Worker process entrypoint — job processors registered in Epic 4
// This stub ensures the Railway worker service definition is valid.
console.log("bitguild-worker: started, no jobs registered yet");

// Prevent process exit
process.on("SIGTERM", () => {
  console.log("bitguild-worker: shutting down");
  process.exit(0);
});
