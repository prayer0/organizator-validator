import Organizator_Nearley_Rule from 'organizator-validator/Component/Nearley/Rule';

export default class Organizator_Nearley_Grammar {
    constructor(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        const byName = this.byName = {};
        this.rules.forEach(rule => {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    static fromCompiled(rules, start) {
        if (rules.ParserStart) {
            start = rules.ParserStart;
            rules = rules.ParserRules;
        }
        var rules = rules.map(r => new Organizator_Nearley_Rule(r.name, r.symbols, r.postprocess));
        return new Organizator_Nearley_Grammar(rules, start);
    }
}