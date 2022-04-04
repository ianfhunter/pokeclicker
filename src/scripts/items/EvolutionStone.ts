///<reference path="Item.ts"/>
class EvolutionStone extends CaughtIndicatingItem {

    type: GameConstants.StoneType;
    public unlockedRegion: GameConstants.Region;

    constructor(type: GameConstants.StoneType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint, displayName: string, unlockedRegion: GameConstants.Region) {
        super(GameConstants.StoneType[type], basePrice, currency, undefined, displayName, undefined, 'evolution');
        this.type = type;
        this.unlockedRegion = unlockedRegion;
    }

    public gain(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n);
    }

    public use(pokemon?: PokemonNameType): boolean {
        const partyPokemon: PartyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(pokemon).id);
        const shiny = partyPokemon.useStone(this.type);
        return shiny;
    }

    getCaughtStatus = ko.pureComputed((): CaughtStatus => {
        // Only include Pokémon which have evolutions
        const unlockedEvolutions = pokemonList.filter((p: PokemonListData) => p.evolutions)
            // only include base Pokémon we have caught
            .filter(p => PartyController.getCaughtStatusByName(p.name))
            // Map to the evolution which uses this stone type
            .map((p: PokemonListData) => p.evolutions.filter(e => e.type.includes(EvolutionType.Stone) && (e as StoneEvolution).stone === this.type))
            // Flatten the array (in case of multiple evolutions)
            .flat()
            // Ensure the we actually found an evolution
            .filter(evolution => evolution)
            // Filter out any Pokémon which can't be obtained yet (future region)
            .filter(evolution => PokemonHelper.calcNativeRegion(evolution.getEvolvedPokemon()) <= player.highestRegion())
            // Finally get the evolution
            .map(evolution => evolution.getEvolvedPokemon());

        // Calculate the lowest caught status
        return unlockedEvolutions.reduce((status: CaughtStatus, pokemonName: PokemonNameType) => {
            return Math.min(status, PartyController.getCaughtStatusByName(pokemonName));
        }, CaughtStatus.CaughtShiny);
    });
}

// TODO: Set prices for different kinds of stones
ItemList['Leaf_stone']        = new EvolutionStone(GameConstants.StoneType.Leaf_stone, 2500, undefined, 'Leaf Stone', GameConstants.Region.kanto);
ItemList['Fire_stone']        = new EvolutionStone(GameConstants.StoneType.Fire_stone, 2500, undefined, 'Fire Stone', GameConstants.Region.kanto);
ItemList['Water_stone']       = new EvolutionStone(GameConstants.StoneType.Water_stone, 2500, undefined, 'Water Stone', GameConstants.Region.kanto);
ItemList['Thunder_stone']     = new EvolutionStone(GameConstants.StoneType.Thunder_stone, 2500, undefined, 'Thunder Stone', GameConstants.Region.kanto);
ItemList['Moon_stone']        = new EvolutionStone(GameConstants.StoneType.Moon_stone, 2500, undefined, 'Moon Stone', GameConstants.Region.kanto);
ItemList['Trade_stone']       = new EvolutionStone(GameConstants.StoneType.Trade_stone, 2500, undefined, 'Trade Stone', GameConstants.Region.kanto);
ItemList['Sun_stone']         = new EvolutionStone(GameConstants.StoneType.Sun_stone, 2500, undefined, 'Sun Stone', GameConstants.Region.johto);
ItemList['Soothe_bell']       = new EvolutionStone(GameConstants.StoneType.Soothe_bell, 2500, undefined , 'Soothe Bell', GameConstants.Region.johto);
ItemList['Metal_coat']        = new EvolutionStone(GameConstants.StoneType.Metal_coat, 2500, undefined , 'Metal Coat', GameConstants.Region.johto);
ItemList['Kings_rock']        = new EvolutionStone(GameConstants.StoneType.Kings_rock, 2500, undefined , 'King\'s Rock', GameConstants.Region.johto);
ItemList['Upgrade']           = new EvolutionStone(GameConstants.StoneType.Upgrade, 2500, undefined , 'Upgrade', GameConstants.Region.johto);
ItemList['Dragon_scale']      = new EvolutionStone(GameConstants.StoneType.Dragon_scale, 2500, undefined, 'Dragon Scale', GameConstants.Region.johto);
ItemList['Prism_scale']       = new EvolutionStone(GameConstants.StoneType.Prism_scale, 2500, undefined , 'Prism Scale', GameConstants.Region.hoenn);
ItemList['Deepsea_tooth']     = new EvolutionStone(GameConstants.StoneType.Deepsea_tooth, 2500, undefined , 'Deep Sea Tooth', GameConstants.Region.hoenn);
ItemList['Deepsea_scale']     = new EvolutionStone(GameConstants.StoneType.Deepsea_scale, 2500, undefined , 'Deep Sea Scale', GameConstants.Region.hoenn);
ItemList['Shiny_stone']       = new EvolutionStone(GameConstants.StoneType.Shiny_stone, 2500, undefined , 'Shiny Stone', GameConstants.Region.sinnoh);
ItemList['Dusk_stone']        = new EvolutionStone(GameConstants.StoneType.Dusk_stone, 2500, undefined , 'Dusk Stone', GameConstants.Region.sinnoh);
ItemList['Dawn_stone']        = new EvolutionStone(GameConstants.StoneType.Dawn_stone, 2500, undefined , 'Dawn Stone', GameConstants.Region.sinnoh);
ItemList['Razor_claw']        = new EvolutionStone(GameConstants.StoneType.Razor_claw, 2500, undefined , 'Razor Claw', GameConstants.Region.sinnoh);
ItemList['Razor_fang']        = new EvolutionStone(GameConstants.StoneType.Razor_fang, 2500, undefined , 'Razor Fang', GameConstants.Region.sinnoh);
ItemList['Electirizer']       = new EvolutionStone(GameConstants.StoneType.Electirizer, 2500, undefined , 'Electirizer', GameConstants.Region.sinnoh);
ItemList['Magmarizer']        = new EvolutionStone(GameConstants.StoneType.Magmarizer, 2500, undefined , 'Magmarizer', GameConstants.Region.sinnoh);
ItemList['Protector']         = new EvolutionStone(GameConstants.StoneType.Protector, 2500, undefined , 'Protector', GameConstants.Region.sinnoh);
ItemList['Dubious_disc']      = new EvolutionStone(GameConstants.StoneType.Dubious_disc, 2500, undefined , 'Dubious Disc', GameConstants.Region.sinnoh);
ItemList['Reaper_cloth']      = new EvolutionStone(GameConstants.StoneType.Reaper_cloth, 2500, undefined , 'Reaper Cloth', GameConstants.Region.sinnoh);
ItemList['Black_DNA']         = new EvolutionStone(GameConstants.StoneType.Black_DNA, 2500, undefined, 'Black DNA', GameConstants.Region.unova);
ItemList['White_DNA']         = new EvolutionStone(GameConstants.StoneType.White_DNA, 2500, undefined, 'White DNA', GameConstants.Region.unova);
ItemList['Sachet']            = new EvolutionStone(GameConstants.StoneType.Sachet, 2500, undefined , 'Sachet', GameConstants.Region.kalos);
ItemList['Whipped_dream']     = new EvolutionStone(GameConstants.StoneType.Whipped_dream, 2500, undefined , 'Whipped Dream', GameConstants.Region.kalos);
ItemList['Ice_stone']         = new EvolutionStone(GameConstants.StoneType.Ice_stone, 2500, undefined , 'Ice Stone', GameConstants.Region.alola);
