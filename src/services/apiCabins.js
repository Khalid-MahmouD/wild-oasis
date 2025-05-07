import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Error Loading Cabins");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://meafqfctfbsowbuhnekk.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  let query = supabase.from("cabins");

  // CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // UPDATE
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Error Creating Cabins");
  }

  // 2. upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. if there is an error on uploading the file
  // delete that cabin
  if (storageError) {
    deleteCabins(data.id);
    throw new Error("Error Uploading Cabin's Image");
  }
  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error Deleting Cabins");
  }

  return error;
}
