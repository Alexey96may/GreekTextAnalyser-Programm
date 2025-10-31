import { StringWorker } from "./classes/StringWorker.js";

/**
 * const name creates new instance StringWorker class with text as a parameter
 */
const text = new StringWorker(
    "Η καριέρα μου στο Water Park Simulator ήρθε η ώρα να εκτοξευτεί. Το όραμά μου θα πραγματοποιηθεί. Δείτε πώς απλά βάφτε. Εμ πολύ γυαλιστερό είναι. Δεν μ αρέσει."
);

/**
 * Example with getting the word list
 *
 * with the name sorting,
 * with simple mode (only one word with the same word base),
 * with packing the list in .txt file in the dist folder
 * with the max limit on 30 words
 */
text.getList("name", true, "txt", 30);
