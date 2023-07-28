import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  pokemonForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pokemonForm = this.formBuilder.group({
      pokemon: this.formBuilder.array([])
    });
  }

  get pokemon(): FormArray {
    return this.pokemonForm.get('pokemon') as FormArray;
  }

  addPokemon() {
    const pokemonControl = this.formBuilder.control('');
    this.pokemon.push(pokemonControl);
  }

  removePokemon(index: number) {
    this.pokemon.removeAt(index);
  }
}
