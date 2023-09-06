const fetchTypeInteractions = async (dispatch, pokemon_type) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${pokemon_type}`
    );
    const data = await response.json();
    console.log(data.damage_relations.double_damage_from)
    dispatch({
      type: "FETCH_TYPE_INTERACTIONS",
      payload: {
        takeTwoTimesDamage: data.damage_relations.double_damage_from,
        dealTwoTimesDamage: data.damage_relations.double_damage_to,
        takeHalfDamage: data.damage_relations.half_damage_from,
        dealHalfDamage: data.damage_relations.half_damage_to,
        takeNoDamage: data.damage_relations.no_damage_from,
        dealNoDamage: data.damage_relations.no_damage_to,
      },
    });
  } catch (error) {
    console.error("Error fetching encounter details:", error);
  }
};

export default fetchTypeInteractions;
