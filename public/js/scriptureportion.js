var dreams = [];
// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');

var unique = [/\s(aaron's)\s/i, /\s(abraham's)\s/i, /\s(abstain)\s/i, /\s(abuse)\s/i, /\s(acceptable)\s/i, /\s(acceptably)\s/i, /\s(accepted)\s/i, /\s(accepts)\s/i, /\s(accompany)\s/i, /\s(accursed)\s/i, /\s(accusations)\s/i, /\s(accuse)\s/i, /\s(acquainted)\s/i, /\s(action)\s/i, /\s(active)\s/i, /\s(add)\s/i, /\s(addresses)\s/i, /\s(adds)\s/i, /\s(administered)\s/i, /\s(administering)\s/i, /\s(admitted)\s/i, /\s(adornment)\s/i, /\s(adulterer)\s/i, /\s(adultery)\s/i, /\s(advantage)\s/i, /\s(afterward)\s/i, /\s(ages)\s/i, /\s(aging)\s/i, /\s(ahead)\s/i, /\s(alert)\s/i, /\s(alive)\s/i, /\s(ancestor)\s/i, /\s(ancestry)\s/i, /\s(anchor)\s/i, /\s(ancient)\s/i, /\s(ancients)\s/i, /\s(animal)\s/i, /\s(animals)\s/i, /\s(announced)\s/i, /\s(annual)\s/i, /\s(anointing)\s/i, /\s(answer)\s/i, /\s(anxiety)\s/i, /\s(apostles)\s/i, /\s(appeal)\s/i, /\s(appealing)\s/i, /\s(appeared)\s/i, /\s(applying)\s/i, /\s(appoints)\s/i, /\s(approach)\s/i, /\s(approaching)\s/i, /\s(architect)\s/i, /\s(argument)\s/i, /\s(arm)\s/i, /\s(armies)\s/i, /\s(arms)\s/i, /\s(arranged)\s/i, /\s(arrives)\s/i, /\s(arrogant)\s/i, /\s(asia)\s/i, /\s(asks)\s/i, /\s(assembly)\s/i, /\s(assurance)\s/i, /\s(attained)\s/i, /\s(attentive)\s/i, /\s(attitude)\s/i, /\s(attitudes)\s/i, /\s(authorities)\s/i, /\s(avenge)\s/i, /\s(awe)\s/i, /\s(babies)\s/i, /\s(babylon)\s/i, /\s(backs)\s/i, /\s(balaam)\s/i, /\s(baptism)\s/i, /\s(baptisms)\s/i, /\s(barak)\s/i, /\s(barren)\s/i, /\s(battle)\s/i, /\s(bearing)\s/i, /\s(bears)\s/i, /\s(beast)\s/i, /\s(beating)\s/i, /\s(beautiful)\s/i, /\s(becoming)\s/i, /\s(bed)\s/i, /\s(begged)\s/i, /\s(begin)\s/i, /\s(begins)\s/i, /\s(behalf)\s/i, /\s(believed)\s/i, /\s(believers)\s/i, /\s(belonged)\s/i, /\s(belonging)\s/i, /\s(beor)\s/i, /\s(best)\s/i, /\s(binding)\s/i, /\s(birth)\s/i, /\s(bithynia)\s/i, /\s(bitter)\s/i, /\s(blackest)\s/i, /\s(blaspheme)\s/i, /\s(blast)\s/i, /\s(blemish)\s/i, /\s(blemishes)\s/i, /\s(bless)\s/i, /\s(blind)\s/i, /\s(blots)\s/i, /\s(boast)\s/i, /\s(boastful)\s/i, /\s(bold)\s/i, /\s(bones)\s/i, /\s(bought)\s/i, /\s(braided)\s/i, /\s(branches)\s/i, /\s(bread)\s/i, /\s(briefly)\s/i, /\s(brings)\s/i, /\s(broad)\s/i, /\s(brood)\s/i, /\s(brotherhood)\s/i, /\s(brute)\s/i, /\s(budded)\s/i, /\s(build)\s/i, /\s(builders)\s/i, /\s(burden)\s/i, /\s(cain)\s/i, /\s(cappadocia)\s/i, /\s(capstone)\s/i, /\s(cares)\s/i, /\s(carouse)\s/i, /\s(carousing)\s/i, /\s(carries)\s/i, /\s(carry)\s/i, /\s(cast)\s/i, /\s(caught)\s/i, /\s(cause)\s/i, /\s(caused)\s/i, /\s(causes)\s/i, /\s(caves)\s/i, /\s(celestial)\s/i, /\s(ceremonially)\s/i, /\s(ceremonies)\s/i, /\s(chained)\s/i, /\s(changed)\s/i, /\s(cherubim)\s/i, /\s(chief)\s/i, /\s(child)\s/i, /\s(choose)\s/i, /\s(chose)\s/i, /\s(christ's)\s/i, /\s(christian)\s/i, /\s(church)\s/i, /\s(circumstances)\s/i, /\s(cities)\s/i, /\s(clean)\s/i, /\s(cleverly)\s/i, /\s(clothe)\s/i, /\s(clothes)\s/i, /\s(cloud)\s/i, /\s(collect)\s/i, /\s(collects)\s/i, /\s(combine)\s/i, /\s(commandment)\s/i, /\s(commend)\s/i, /\s(commit)\s/i, /\s(companions)\s/i, /\s(compassionate)\s/i, /\s(completely)\s/i, /\s(concerning)\s/i, /\s(condemnation)\s/i, /\s(confident)\s/i, /\s(confirms)\s/i, /\s(confiscation)\s/i, /\s(conform)\s/i, /\s(congregation)\s/i, /\s(conquered)\s/i, /\s(consciences)\s/i, /\s(conscious)\s/i, /\s(consecrated)\s/i, /\s(considered)\s/i, /\s(constant)\s/i, /\s(consume)\s/i, /\s(consuming)\s/i, /\s(contain)\s/i, /\s(contained)\s/i, /\s(content)\s/i, /\s(contest)\s/i, /\s(continually)\s/i, /\s(copies)\s/i, /\s(cornerstone)\s/i, /\s(corrupt)\s/i, /\s(countless)\s/i, /\s(courage)\s/i, /\s(covered)\s/i, /\s(covers)\s/i, /\s(crave)\s/i, /\s(created)\s/i, /\s(creator)\s/i, /\s(creatures)\s/i, /\s(credit)\s/i, /\s(cries)\s/i, /\s(criminal)\s/i, /\s(crop)\s/i, /\s(cross)\s/i, /\s(crown)\s/i, /\s(crucifying)\s/i, /\s(cursed)\s/i, /\s(daily)\s/i, /\s(danger)\s/i, /\s(dark)\s/i, /\s(daughter)\s/i, /\s(daughters)\s/i, /\s(dawns)\s/i, /\s(daylight)\s/i, /\s(deal)\s/i, /\s(debauchery)\s/i, /\s(deceitful)\s/i, /\s(deceitfulness)\s/i, /\s(defeat)\s/i, /\s(defect)\s/i, /\s(defile)\s/i, /\s(delay)\s/i, /\s(deluged)\s/i, /\s(denying)\s/i, /\s(departure)\s/i, /\s(depravity)\s/i, /\s(descent)\s/i, /\s(deserts)\s/i, /\s(deserves)\s/i, /\s(designated)\s/i, /\s(despise)\s/i, /\s(destitute)\s/i, /\s(destroy)\s/i, /\s(destroyer)\s/i, /\s(destructive)\s/i, /\s(detail)\s/i, /\s(detestable)\s/i, /\s(devour)\s/i, /\s(different)\s/i, /\s(diligence)\s/i, /\s(dirt)\s/i, /\s(disabled)\s/i, /\s(disclosed)\s/i, /\s(discuss)\s/i, /\s(disobedient)\s/i, /\s(disobey)\s/i, /\s(disrepute)\s/i, /\s(dissipation)\s/i, /\s(distance)\s/i, /\s(distinguish)\s/i, /\s(distort)\s/i, /\s(distressed)\s/i, /\s(distributed)\s/i, /\s(dividing)\s/i, /\s(dog)\s/i, /\s(donkey)\s/i, /\s(double)\s/i, /\s(doubt)\s/i, /\s(dreadful)\s/i, /\s(drift)\s/i, /\s(drink)\s/i, /\s(drinks)\s/i, /\s(driven)\s/i, /\s(drowned)\s/i, /\s(drunkenness)\s/i, /\s(dry)\s/i, /\s(due)\s/i, /\s(dungeons)\s/i, /\s(duties)\s/i, /\s(dying)\s/i, /\s(earlier)\s/i, /\s(earnestly)\s/i, /\s(ears)\s/i, /\s(easily)\s/i, /\s(edge)\s/i, /\s(edged)\s/i, /\s(edict)\s/i, /\s(egyptians)\s/i, /\s(eight)\s/i, /\s(elder)\s/i, /\s(elders)\s/i, /\s(elect)\s/i, /\s(election)\s/i, /\s(enabled)\s/i, /\s(encouraged)\s/i, /\s(encouragement)\s/i, /\s(encouraging)\s/i, /\s(endlessly)\s/i, /\s(enemy)\s/i, /\s(enjoy)\s/i, /\s(enlightened)\s/i, /\s(enoch)\s/i, /\s(enough)\s/i, /\s(entangled)\s/i, /\s(entangles)\s/i, /\s(entering)\s/i, /\s(entertain)\s/i, /\s(entertained)\s/i, /\s(entice)\s/i, /\s(envy)\s/i, /\s(equip)\s/i, /\s(escaping)\s/i, /\s(especially)\s/i, /\s(establish)\s/i, /\s(established)\s/i, /\s(exact)\s/i, /\s(exalted)\s/i, /\s(examples)\s/i, /\s(exhortation)\s/i, /\s(existed)\s/i, /\s(exodus)\s/i, /\s(expectation)\s/i, /\s(experience)\s/i, /\s(experts)\s/i, /\s(explain)\s/i, /\s(exploit)\s/i, /\s(exposed)\s/i, /\s(external)\s/i, /\s(eyewitnesses)\s/i, /\s(faced)\s/i, /\s(faithfully)\s/i, /\s(fallen)\s/i, /\s(falling)\s/i, /\s(farmed)\s/i, /\s(fast)\s/i, /\s(fault)\s/i, /\s(fearful)\s/i, /\s(fearing)\s/i, /\s(feast)\s/i, /\s(feeble)\s/i, /\s(felt)\s/i, /\s(few)\s/i, /\s(field)\s/i, /\s(figuratively)\s/i, /\s(filled)\s/i, /\s(filthy)\s/i, /\s(finally)\s/i, /\s(fine)\s/i, /\s(finished)\s/i, /\s(fitting)\s/i, /\s(fled)\s/i, /\s(flesh)\s/i, /\s(flogging)\s/i, /\s(foods)\s/i, /\s(foolish)\s/i, /\s(foot)\s/i, /\s(force)\s/i, /\s(foreknowledge)\s/i, /\s(forgive)\s/i, /\s(forgiven)\s/i, /\s(forgiveness)\s/i, /\s(former)\s/i, /\s(formerly)\s/i, /\s(forms)\s/i, /\s(forsake)\s/i, /\s(foundation)\s/i, /\s(founded)\s/i, /\s(frightened)\s/i, /\s(fruit)\s/i, /\s(fully)\s/i, /\s(further)\s/i, /\s(fury)\s/i, /\s(gain)\s/i, /\s(gained)\s/i, /\s(galatia)\s/i, /\s(gate)\s/i, /\s(genealogy)\s/i, /\s(generation)\s/i, /\s(gentle)\s/i, /\s(gentleness)\s/i, /\s(gently)\s/i, /\s(genuine)\s/i, /\s(gideon)\s/i, /\s(gives)\s/i, /\s(gloom)\s/i, /\s(gloomy)\s/i, /\s(glories)\s/i, /\s(glorified)\s/i, /\s(glorify)\s/i, /\s(glorious)\s/i, /\s(goal)\s/i, /\s(goatskins)\s/i, /\s(godless)\s/i, /\s(golden)\s/i, /\s(gomorrah)\s/i, /\s(governors)\s/i, /\s(gracious)\s/i, /\s(greedy)\s/i, /\s(grief)\s/i, /\s(grown)\s/i, /\s(grows)\s/i, /\s(grumbling)\s/i, /\s(guarantee)\s/i, /\s(guard)\s/i, /\s(habit)\s/i, /\s(hair)\s/i, /\s(handed)\s/i, /\s(hanging)\s/i, /\s(happen)\s/i, /\s(happening)\s/i, /\s(hardened)\s/i, /\s(hardship)\s/i, /\s(harmony)\s/i, /\s(harsh)\s/i, /\s(harvest)\s/i, /\s(hated)\s/i, /\s(heap)\s/i, /\s(heat)\s/i, /\s(heifer)\s/i, /\s(hell)\s/i, /\s(helped)\s/i, /\s(helper)\s/i, /\s(helps)\s/i, /\s(heresies)\s/i, /\s(herself)\s/i, /\s(hid)\s/i, /\s(hidden)\s/i, /\s(hinder)\s/i, /\s(hinders)\s/i, /\s(holds)\s/i, /\s(holes)\s/i, /\s(honorably)\s/i, /\s(honored)\s/i, /\s(hospitality)\s/i, /\s(humanity)\s/i, /\s(humility)\s/i, /\s(hurled)\s/i, /\s(hypocrisy)\s/i, /\s(hyssop)\s/i, /\s(idea)\s/i, /\s(idolatry)\s/i, /\s(ignore)\s/i, /\s(illegitimate)\s/i, /\s(illustration)\s/i, /\s(impartially)\s/i, /\s(imperishable)\s/i, /\s(incense)\s/i, /\s(increasing)\s/i, /\s(indestructible)\s/i, /\s(indicate)\s/i, /\s(indicating)\s/i, /\s(ineffective)\s/i, /\s(inexpressible)\s/i, /\s(infant)\s/i, /\s(inherited)\s/i, /\s(instinct)\s/i, /\s(instituted)\s/i, /\s(instruction)\s/i, /\s(instructions)\s/i, /\s(insults)\s/i, /\s(intently)\s/i, /\s(intercede)\s/i, /\s(interpretation)\s/i, /\s(introduce)\s/i, /\s(introduced)\s/i, /\s(invented)\s/i, /\s(invisible)\s/i, /\s(israelites)\s/i, /\s(italy)\s/i, /\s(jar)\s/i, /\s(jeers)\s/i, /\s(jephthah)\s/i, /\s(jericho)\s/i, /\s(jerusalem)\s/i, /\s(jewelry)\s/i, /\s(joints)\s/i, /\s(joseph)\s/i, /\s(joseph's)\s/i, /\s(joshua)\s/i, /\s(joyful)\s/i, /\s(joyfully)\s/i, /\s(judged)\s/i, /\s(justice)\s/i, /\s(justly)\s/i, /\s(killed)\s/i, /\s(kingdoms)\s/i, /\s(kings)\s/i, /\s(kiss)\s/i, /\s(knees)\s/i, /\s(knew)\s/i, /\s(knows)\s/i, /\s(lamb)\s/i, /\s(lame)\s/i, /\s(lampstand)\s/i, /\s(lasting)\s/i, /\s(lay)\s/i, /\s(lazy)\s/i, /\s(leaned)\s/i, /\s(learn)\s/i, /\s(learned)\s/i, /\s(least)\s/i, /\s(leaving)\s/i, /\s(led)\s/i, /\s(less)\s/i, /\s(lesser)\s/i, /\s(level)\s/i, /\s(levitical)\s/i, /\s(lie)\s/i, /\s(lift)\s/i, /\s(lion)\s/i, /\s(lions)\s/i, /\s(longing)\s/i, /\s(lording)\s/i, /\s(loss)\s/i, /\s(lot)\s/i, /\s(loud)\s/i, /\s(loves)\s/i, /\s(loving)\s/i, /\s(lust)\s/i, /\s(lustful)\s/i, /\s(madness)\s/i, /\s(majestic)\s/i, /\s(malice)\s/i, /\s(maliciously)\s/i, /\s(manna)\s/i, /\s(marched)\s/i, /\s(mark)\s/i, /\s(marked)\s/i, /\s(marrow)\s/i, /\s(master)\s/i, /\s(mastered)\s/i, /\s(masters)\s/i, /\s(matter)\s/i, /\s(mature)\s/i, /\s(maturity)\s/i, /\s(meal)\s/i, /\s(measure)\s/i, /\s(meddler)\s/i, /\s(meeting)\s/i, /\s(meets)\s/i, /\s(melt)\s/i, /\s(memory)\s/i, /\s(merciful)\s/i, /\s(mighty)\s/i, /\s(minded)\s/i, /\s(mindful)\s/i, /\s(mine)\s/i, /\s(minister)\s/i, /\s(ministering)\s/i, /\s(miracles)\s/i, /\s(misses)\s/i, /\s(mists)\s/i, /\s(months)\s/i, /\s(moreover)\s/i, /\s(morning)\s/i, /\s(mother)\s/i, /\s(mount)\s/i, /\s(mountains)\s/i, /\s(mouths)\s/i, /\s(mud)\s/i, /\s(multitude)\s/i, /\s(murderer)\s/i, /\s(names)\s/i, /\s(nation)\s/i, /\s(nearly)\s/i, /\s(nearsighted)\s/i, /\s(neighbor)\s/i, /\s(newborn)\s/i, /\s(numerous)\s/i, /\s(obedient)\s/i, /\s(obeying)\s/i, /\s(obtained)\s/i, /\s(offers)\s/i, /\s(office)\s/i, /\s(offspring)\s/i, /\s(often)\s/i, /\s(oil)\s/i, /\s(old)\s/i, /\s(older)\s/i, /\s(oldest)\s/i, /\s(opened)\s/i, /\s(opportunity)\s/i, /\s(opposes)\s/i, /\s(opposition)\s/i, /\s(ordinary)\s/i, /\s(orgies)\s/i, /\s(origin)\s/i, /\s(ours)\s/i, /\s(ourselves)\s/i, /\s(outer)\s/i, /\s(outward)\s/i, /\s(outwardly)\s/i, /\s(overcome)\s/i, /\s(overjoyed)\s/i, /\s(overseer)\s/i, /\s(overseers)\s/i, /\s(overshadowing)\s/i, /\s(pain)\s/i, /\s(parents)\s/i, /\s(part)\s/i, /\s(particularly)\s/i, /\s(partner)\s/i, /\s(passage)\s/i, /\s(passover)\s/i, /\s(paths)\s/i, /\s(patient)\s/i, /\s(patriarch)\s/i, /\s(pattern)\s/i, /\s(paul)\s/i, /\s(penetrates)\s/i, /\s(perfecter)\s/i, /\s(perfection)\s/i, /\s(performs)\s/i, /\s(perishes)\s/i, /\s(permanent)\s/i, /\s(permitting)\s/i, /\s(persecuted)\s/i, /\s(persecution)\s/i, /\s(persevere)\s/i, /\s(persevered)\s/i, /\s(person)\s/i, /\s(petitions)\s/i, /\s(pharaoh's)\s/i, /\s(planned)\s/i, /\s(pleasant)\s/i, /\s(please)\s/i, /\s(pleasing)\s/i, /\s(pleasure)\s/i, /\s(pledge)\s/i, /\s(plunder)\s/i, /\s(plunge)\s/i, /\s(pointing)\s/i, /\s(pontus)\s/i, /\s(position)\s/i, /\s(possess)\s/i, /\s(possessions)\s/i, /\s(praised)\s/i, /\s(prayer)\s/i, /\s(preacher)\s/i, /\s(predicted)\s/i, /\s(prepare)\s/i, /\s(prescribed)\s/i, /\s(prevented)\s/i, /\s(prisoners)\s/i, /\s(proclaimed)\s/i, /\s(proper)\s/i, /\s(property)\s/i, /\s(prostitute)\s/i, /\s(protected)\s/i, /\s(proud)\s/i, /\s(prove)\s/i, /\s(proved)\s/i, /\s(proverbs)\s/i, /\s(provided)\s/i, /\s(provides)\s/i, /\s(prowls)\s/i, /\s(public)\s/i, /\s(publicly)\s/i, /\s(punish)\s/i, /\s(punished)\s/i, /\s(punishes)\s/i, /\s(purification)\s/i, /\s(purity)\s/i, /\s(purpose)\s/i, /\s(pursue)\s/i, /\s(puts)\s/i, /\s(qualities)\s/i, /\s(quenched)\s/i, /\s(quiet)\s/i, /\s(race)\s/i, /\s(radiance)\s/i, /\s(raging)\s/i, /\s(rahab)\s/i, /\s(rain)\s/i, /\s(raise)\s/i, /\s(ransom)\s/i, /\s(realities)\s/i, /\s(reasoned)\s/i, /\s(rebelled)\s/i, /\s(rebuked)\s/i, /\s(rebukes)\s/i, /\s(recall)\s/i, /\s(receives)\s/i, /\s(reckoned)\s/i, /\s(red)\s/i, /\s(redeemed)\s/i, /\s(redemption)\s/i, /\s(refined)\s/i, /\s(refresh)\s/i, /\s(refuse)\s/i, /\s(regarded)\s/i, /\s(regularly)\s/i, /\s(related)\s/i, /\s(religious)\s/i, /\s(remind)\s/i, /\s(reminder)\s/i, /\s(reminders)\s/i, /\s(removal)\s/i, /\s(removing)\s/i, /\s(repeated)\s/i, /\s(represent)\s/i, /\s(representation)\s/i, /\s(required)\s/i, /\s(rescue)\s/i, /\s(rescued)\s/i, /\s(resist)\s/i, /\s(resisted)\s/i, /\s(respected)\s/i, /\s(rested)\s/i, /\s(restore)\s/i, /\s(restored)\s/i, /\s(restrained)\s/i, /\s(retaliate)\s/i, /\s(return)\s/i, /\s(returned)\s/i, /\s(returning)\s/i, /\s(returns)\s/i, /\s(reveling)\s/i, /\s(reward)\s/i, /\s(rewarded)\s/i, /\s(rewards)\s/i, /\s(rich)\s/i, /\s(richly)\s/i, /\s(rid)\s/i, /\s(rights)\s/i, /\s(rises)\s/i, /\s(roar)\s/i, /\s(roaring)\s/i, /\s(robe)\s/i, /\s(rock)\s/i, /\s(roll)\s/i, /\s(root)\s/i, /\s(routed)\s/i, /\s(royal)\s/i, /\s(run)\s/i, /\s(sabbath)\s/i, /\s(samson)\s/i, /\s(samuel)\s/i, /\s(sanctified)\s/i, /\s(sanctify)\s/i, /\s(sanctifying)\s/i, /\s(sand)\s/i, /\s(sawed)\s/i, /\s(scarlet)\s/i, /\s(scattered)\s/i, /\s(scepter)\s/i, /\s(scoffers)\s/i, /\s(scoffing)\s/i, /\s(scorning)\s/i, /\s(scriptures)\s/i, /\s(sea)\s/i, /\s(searched)\s/i, /\s(seashore)\s/i, /\s(secretly)\s/i, /\s(seduce)\s/i, /\s(seed)\s/i, /\s(seems)\s/i, /\s(selected)\s/i, /\s(send)\s/i, /\s(sends)\s/i, /\s(served)\s/i, /\s(service)\s/i, /\s(sets)\s/i, /\s(severely)\s/i, /\s(shake)\s/i, /\s(shameful)\s/i, /\s(sharper)\s/i, /\s(sheepskins)\s/i, /\s(shepherds)\s/i, /\s(shielded)\s/i, /\s(shining)\s/i, /\s(shook)\s/i, /\s(showing)\s/i, /\s(shrink)\s/i, /\s(shrinks)\s/i, /\s(shut)\s/i, /\s(signs)\s/i, /\s(silas)\s/i, /\s(silence)\s/i, /\s(silver)\s/i, /\s(simon)\s/i, /\s(sin's)\s/i, /\s(sing)\s/i, /\s(single)\s/i, /\s(sinner)\s/i, /\s(sinners)\s/i, /\s(sit)\s/i, /\s(sky)\s/i, /\s(slanderous)\s/i, /\s(slave)\s/i, /\s(slavery)\s/i, /\s(sleeping)\s/i, /\s(slowness)\s/i, /\s(sodom)\s/i, /\s(sold)\s/i, /\s(somebody)\s/i, /\s(sometimes)\s/i, /\s(somewhere)\s/i, /\s(source)\s/i, /\s(sovereign)\s/i, /\s(sow)\s/i, /\s(speed)\s/i, /\s(spent)\s/i, /\s(spies)\s/i, /\s(spoil)\s/i, /\s(spotless)\s/i, /\s(springs)\s/i, /\s(spur)\s/i, /\s(stand)\s/i, /\s(star)\s/i, /\s(stars)\s/i, /\s(steadfast)\s/i, /\s(steps)\s/i, /\s(stimulate)\s/i, /\s(stones)\s/i, /\s(stop)\s/i, /\s(stopped)\s/i, /\s(straight)\s/i, /\s(stranger)\s/i, /\s(strengthen)\s/i, /\s(strengthened)\s/i, /\s(strong)\s/i, /\s(stronger)\s/i, /\s(struggle)\s/i, /\s(subjected)\s/i, /\s(subjecting)\s/i, /\s(supreme)\s/i, /\s(surprised)\s/i, /\s(surrounded)\s/i, /\s(sustaining)\s/i, /\s(swift)\s/i, /\s(swore)\s/i, /\s(sworn)\s/i, /\s(symbolizes)\s/i, /\s(sympathetic)\s/i, /\s(sympathize)\s/i, /\s(sympathized)\s/i, /\s(table)\s/i, /\s(tablets)\s/i, /\s(talk)\s/i, /\s(taste)\s/i, /\s(teaching)\s/i, /\s(tell)\s/i, /\s(tent)\s/i, /\s(tents)\s/i, /\s(terrifying)\s/i, /\s(testifies)\s/i, /\s(testimony)\s/i, /\s(testing)\s/i, /\s(thankful)\s/i, /\s(thistles)\s/i, /\s(thorns)\s/i, /\s(thought)\s/i, /\s(threats)\s/i, /\s(till)\s/i, /\s(timothy)\s/i, /\s(tongue)\s/i, /\s(top)\s/i, /\s(tormented)\s/i, /\s(tortured)\s/i, /\s(touch)\s/i, /\s(touched)\s/i, /\s(touches)\s/i, /\s(trace)\s/i, /\s(trampled)\s/i, /\s(treasures)\s/i, /\s(treat)\s/i, /\s(treating)\s/i, /\s(tree)\s/i, /\s(trembling)\s/i, /\s(trial)\s/i, /\s(trouble)\s/i, /\s(trumpet)\s/i, /\s(trust)\s/i, /\s(trusts)\s/i, /\s(truths)\s/i, /\s(trying)\s/i, /\s(turns)\s/i, /\s(unable)\s/i, /\s(unbelief)\s/i, /\s(unbelieving)\s/i, /\s(unblemished)\s/i, /\s(unchangeable)\s/i, /\s(unchanging)\s/i, /\s(unclean)\s/i, /\s(uncovered)\s/i, /\s(undergoes)\s/i, /\s(undergoing)\s/i, /\s(unfading)\s/i, /\s(unholy)\s/i, /\s(unlike)\s/i, /\s(unproductive)\s/i, /\s(unswervingly)\s/i, /\s(useful)\s/i, /\s(useless)\s/i, /\s(violation)\s/i, /\s(visible)\s/i, /\s(visits)\s/i, /\s(vomit)\s/i, /\s(wages)\s/i, /\s(waited)\s/i, /\s(waits)\s/i, /\s(wallowing)\s/i, /\s(walls)\s/i, /\s(wanting)\s/i, /\s(wants)\s/i, /\s(war)\s/i, /\s(warns)\s/i, /\s(washings)\s/i, /\s(watch)\s/i, /\s(waters)\s/i, /\s(weaker)\s/i, /\s(weaknesses)\s/i, /\s(wear)\s/i, /\s(wearing)\s/i, /\s(weary)\s/i, /\s(welcome)\s/i, /\s(whether)\s/i, /\s(whoever)\s/i, /\s(wholesome)\s/i, /\s(willing)\s/i, /\s(winds)\s/i, /\s(wisdom)\s/i, /\s(withers)\s/i, /\s(witness)\s/i, /\s(won)\s/i, /\s(wonderful)\s/i, /\s(wonders)\s/i, /\s(wool)\s/i, /\s(worse)\s/i, /\s(worshiped)\s/i, /\s(worshiper)\s/i, /\s(worshipers)\s/i, /\s(worthless)\s/i, /\s(wounds)\s/i, /\s(writes)\s/i, /\s(wrongdoing)\s/i, /\s(wrote)\s/i, /\s(yesterday)\s/i, /\s(younger)\s/i];
var smemlist = ["H4:16", "H9:14", "H1:3", "H5:7", "H9:15", "H12:1", "1P2:9", "2P1:3", "H1:10", "H9:22", "H12:3", "1P2:10", "H2:1", "H6:10", "H9:24", "H12:7", "1P2:12", "2P1:16", "H2:3", "H6:17", "H12:14", "2P1:19", "H2:9", "H10:14", "H2:10", "H10:23", "1P3:15", "2P2:21", "H2:11", "H13:4", "H2:18", "H7:26", "H13:5", "1P4:8", "H3:1", "H7:27", "H10:39", "H13:8", "1P4:10", "2P3:18", "H11:1", "1P4:11", "H8:6", "H11:3", "H4:12", "H8:10", "H11:6", "1P5:6", "H4:13", "H11:9", "1P5:7", "H9:12", "H11:26", "1P1:22", "1P5:9"];
var mmemlist = [{
  "r1": "H1:1",
  "r2": "H1:2"
}, {
  "r1": "H11:39",
  "r2": "H11:40"
}, {
  "r1": "1P2:4",
  "r2": "1P2:5"
}, {
  "r1": "1P5:10",
  "r2": "1P5:11"
}, {
  "r1": "H5:8",
  "r2": "H5:10"
}, {
  "r1": "2P1:5",
  "r2": "2P1:7"
}, {
  "r1": "H9:27",
  "r2": "H9:28"
}, {
  "r1": "1P2:24",
  "r2": "1P2:25"
}, {
  "r1": "H6:19",
  "r2": "H6:20"
}, {
  "r1": "H12:28",
  "r2": "H12:29"
}, {
  "r1": "1P3:8",
  "r2": "1P3:9"
}, {
  "r1": "2P1:20",
  "r2": "2P1:21"
}, {
  "r1": "H7:18",
  "r2": "H7:19"
}, {
  "r1": "H13:1",
  "r2": "H13:2"
}, {
  "r1": "H7:24",
  "r2": "H7:25"
}, {
  "r1": "H10:24",
  "r2": "H10:25"
}, {
  "r1": "1P3:17",
  "r2": "1P3:18"
}, {
  "r1": "2P3:8",
  "r2": "2P3:9"
}, {
  "r1": "H10:26",
  "r2": "H10:27"
}, {
  "r1": "2P3:11",
  "r2": "2P3:12"
}, {
  "r1": "H3:12",
  "r2": "H3:13"
}, {
  "r1": "H8:1",
  "r2": "H8:2"
}, {
  "r1": "H13:15",
  "r2": "H13:16"
}, {
  "r1": "H4:9",
  "r2": "H4:10"
}, {
  "r1": "1P1:3",
  "r2": "1P1:4"
}, {
  "r1": "1P5:2",
  "r2": "1P5:3"
}, {
  "r1": "1P1:8",
  "r2": "1P1:9"
}, {
  "r1": "H8:11",
  "r2": "H8:12"
}, {
  "r1": "1P1:15",
  "r2": "1P1:16"
}, {
  "r1": "H4:14",
  "r2": "H4:15"
}];
var hi_u = true;
var hi_sm = true;
var hi_mm = true;
const hi_mm_d = document.querySelector('#m-verse-h');
const hi_sm_d = document.querySelector('#s-verse-h');
const hi_u_d = document.querySelector('#u-word');
const hi_mm_c = document.querySelector('#m-m-c');
const hi_sm_c = document.querySelector('#s-m-c');
const hi_u_c = document.querySelector('#u-w-c');
var mylocalkey = "koalastrikermi-bbqo-";

const ch_set = document.querySelector('#ch-select');

const ls = {
  hl: {
    himm: localStorage.getItem('hi_mm_d'),
    hism: localStorage.getItem('hi_sm_d'),
    hiu: localStorage.getItem('hi_u_d')
  },
  c: {
    cmm: localStorage.getItem('hi_mm_c'),
    csm: localStorage.getItem('hi_sm_c'),
    cu: localStorage.getItem('hi_u_c')
  }
}

console.dir(ls)
var log = function (t, deco, type) {
  if (type === "normal" || type === undefined) {
    if (deco === "") {
      console.log(t);
    } else {
      console.log("%c" + t, deco);
    }
  } else if (type === "clear") {
    console.clear();
    if (deco === "") {
      console.log("log cleared");
    } else {
      console.log("%c log cleared", deco);
    }
  } else if (type === "groupbegin") {
    if (deco === "") {
      console.group(t);
    } else {
      console.group("%c" + t, deco);
    }
  } else if (type === "groupend") {
    if (deco === "") {
      console.log(t);
      console.groupEnd();
    } else {
      console.log("%c" + t, deco);
      console.groupEnd();
    }
  } else if (type === "warn") {
    if (deco === "") {
      console.warn(t);
    } else {
      console.warn("%c" + t, deco);
    }
  } else if (type === "error") {
    if (deco === "") {
      console.error(t);
    } else {
      console.error("%c" + t, deco);
    }
  }
};
var lss = function (vare, gs,l, t) {
if (gs === "set") {
    localStorage.setItem(mylocalkey + vare, t);
    //if(l){
    log("localstorage item " + mylocalkey + vare + " is now set to: " + localStorage.getItem(mylocalkey + vare));
    //}
  } else if (gs === "get") {
    //if(l){log("localstorage item " + mylocalkey + vare + " was returned as: " + localStorage.getItem(mylocalkey + vare));}
    return localStorage.getItem(mylocalkey + vare);
  } else if (gs === "dv") {
    //if(l){log(mylocalkey + vare + "  was deleted");}
    localStorage.removeItem(mylocalkey + vare);
  }
};
console.log(lss('hi_mm_d',"get"))

if(lss('visited',"get")===null){
  lss('hi_mm_d',"set","true")
}
if(lss('visited',"get")===null){
  lss('hi_sm_d',"set","true")
}
if(lss('visited',"get")===null){
  lss('hi_u_d',"set","true")
}
if(lss('visited',"get")===null){
  lss('c_mm_d',"set","#808000")
}
if(lss('visited',"get")===null){
  lss('c_sm_d',"set","#00bb00")
}
if(lss('visited',"get")===null){
  lss('c_u_d',"set","#ff0000")
}
lss('visited',"set","true")

var hi_u = lss('hi_u_d',"get");
var hi_sm = lss('hi_sm_d',"get");
var hi_mm = lss('hi_mm_d',"get");

var ch = "h1";
var c = 1;
if (ch.indexOf("1p") !== -1) {
  c = 13 + ch.split("p")[1]
} else if (ch.indexOf("2p") !== -1) {
  c = 18 + ch.split("p")[1]
} else {
  c = ch.split("h")[1]
}

ch_set.addEventListener('change', (event) => {
  console.log(ch_set.value);
  ch = ch_set.value;
  if (ch.indexOf("1p") !== -1) {
    c = 13 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else if (ch.indexOf("2p") !== -1) {
    c = 18 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else {
    c = ch.split("h")[1]
     console.log(c)
  }
  dreamsList.innerHTML = "";
  console.log(c)
  let dream = dreams[c].split(/[0-9]+/);
  
  for (var j = 0; j < dream.length; j++) {
    if (c <= 13) {
      append("Hebrews " + c + ":" + (j + 1) + " " + dream[j], "H" + c + ":" + (j + 1));
    } else if (c <= 18 && c > 13) {
      append("1Peter " + (c-13) + ":" + (j + 1) + " " + dream[j], "1P" + (c-13) + ":" + (j + 1));
    } else {
      append("2Peter " + (c-18) + ":" + (j + 1) + " " + dream[j], "2P" + (c-18) + ":" + (j + 1));
    }
  }
    let un1 = document.querySelectorAll('.memory-verse-m')
  for (var i = 0; i < un1.length; i++) {
    un1[i].style.background = hi_mm_c.value;
  }
  let un2 = document.querySelectorAll('.memory-verse-s')
  for (var i = 0; i < un2.length; i++) {
    un2[i].style.background = hi_sm_c.value;
  }
  let un3 = document.querySelectorAll('.uniqueword');
  for (var i = 0; i < un3.length; i++) {
    un3[i].style.color = hi_u_c.value;
  }
});

hi_mm_d.addEventListener('input', (event) => {
  lss('hi_mm_d',"set", hi_mm_d.checked)
  if (hi_mm_d.checked) {
    hi_mm = true;
  } else {
    hi_mm = false;
  }
      console.log(ch_set.value);
  ch = ch_set.value;
  if (ch.indexOf("1p") !== -1) {
    c = 13 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else if (ch.indexOf("2p") !== -1) {
    c = 18 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else {
    c = ch.split("h")[1]
     console.log(c)
  }
  dreamsList.innerHTML = "";
  console.log(c)
  let dream = dreams[c].split(/[0-9]+/);
  
  for (var j = 0; j < dream.length; j++) {
    if (c <= 13) {
      append("Hebrews " + c + ":" + (j + 1) + " " + dream[j], "H" + c + ":" + (j + 1));
    } else if (c <= 18 && c > 13) {
      append("1Peter " + (c-13) + ":" + (j + 1) + " " + dream[j], "1P" + (c-13) + ":" + (j + 1));
    } else {
      append("2Peter " + (c-18) + ":" + (j + 1) + " " + dream[j], "2P" + (c-18) + ":" + (j + 1));
    }
  }
    let un1 = document.querySelectorAll('.memory-verse-m')
  for (var i = 0; i < un1.length; i++) {
    un1[i].style.background = hi_mm_c.value;
  }
  let un2 = document.querySelectorAll('.memory-verse-s')
  for (var i = 0; i < un2.length; i++) {
    un2[i].style.background = hi_sm_c.value;
  }
  let un3 = document.querySelectorAll('.uniqueword');
  for (var i = 0; i < un3.length; i++) {
    un3[i].style.color = hi_u_c.value;
  }
});
hi_sm_d.addEventListener('input', (event) => {
  lss('hi_sm_d',"set", hi_sm_d.checked)
  if (hi_sm_d.checked) {
    hi_sm = true;
  } else {
    hi_sm = false;
  }
    console.log(ch_set.value);
  ch = ch_set.value;
  if (ch.indexOf("1p") !== -1) {
    c = 13 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else if (ch.indexOf("2p") !== -1) {
    c = 18 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else {
    c = ch.split("h")[1]
     console.log(c)
  }
  dreamsList.innerHTML = "";
  console.log(c)
  let dream = dreams[c].split(/[0-9]+/);
  
  for (var j = 0; j < dream.length; j++) {
    if (c <= 13) {
      append("Hebrews " + c + ":" + (j + 1) + " " + dream[j], "H" + c + ":" + (j + 1));
    } else if (c <= 18 && c > 13) {
      append("1Peter " + (c-13) + ":" + (j + 1) + " " + dream[j], "1P" + (c-13) + ":" + (j + 1));
    } else {
      append("2Peter " + (c-18) + ":" + (j + 1) + " " + dream[j], "2P" + (c-18) + ":" + (j + 1));
    }
  }
    let un1 = document.querySelectorAll('.memory-verse-m')
  for (var i = 0; i < un1.length; i++) {
    un1[i].style.background = hi_mm_c.value;
  }
  let un2 = document.querySelectorAll('.memory-verse-s')
  for (var i = 0; i < un2.length; i++) {
    un2[i].style.background = hi_sm_c.value;
  }
  let un3 = document.querySelectorAll('.uniqueword');
  for (var i = 0; i < un3.length; i++) {
    un3[i].style.color = hi_u_c.value;
  }
});
hi_u_d.addEventListener('input', (event) => {
  lss('hi_u_d',"set",event.target.checked.toString())
  console.log(event.target.checked.toString())
  if (event.target.checked) {
    hi_u = true;
  } else {
    hi_u = false;
  }
    console.log(ch_set.value);
  ch = ch_set.value;
  if (ch.indexOf("1p") !== -1) {
    c = 13 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else if (ch.indexOf("2p") !== -1) {
    c = 18 + parseFloat(ch.split("p")[1])
     console.log(c)
  } else {
    c = ch.split("h")[1]
     console.log(c)
  }
  dreamsList.innerHTML = "";
  console.log(c)
  let dream = dreams[c].split(/[0-9]+/);
  
  for (var j = 0; j < dream.length; j++) {
    if (c <= 13) {
      append("Hebrews " + c + ":" + (j + 1) + " " + dream[j], "H" + c + ":" + (j + 1));
    } else if (c <= 18 && c > 13) {
      append("1Peter " + (c-13) + ":" + (j + 1) + " " + dream[j], "1P" + (c-13) + ":" + (j + 1));
    } else {
      append("2Peter " + (c-18) + ":" + (j + 1) + " " + dream[j], "2P" + (c-18) + ":" + (j + 1));
    }
  }
    let un1 = document.querySelectorAll('.memory-verse-m')
  for (var i = 0; i < un1.length; i++) {
    un1[i].style.background = hi_mm_c.value;
  }
  let un2 = document.querySelectorAll('.memory-verse-s')
  for (var i = 0; i < un2.length; i++) {
    un2[i].style.background = hi_sm_c.value;
  }
  let un3 = document.querySelectorAll('.uniqueword');
  for (var i = 0; i < un3.length; i++) {
    un3[i].style.color = hi_u_c.value;
  }
});
hi_mm_c.addEventListener('change', (event) => {
  let un1 = document.querySelectorAll('.memory-verse-m')
  for (var i = 0; i < un1.length; i++) {
    un1[i].style.background = event.target.value;
  }
  lss('hi_mm_c',"set", hi_mm_c.value)
});
hi_sm_c.addEventListener('change', (event) => {
  let un2 = document.querySelectorAll('.memory-verse-s')
  for (var i = 0; i < un2.length; i++) {
    un2[i].style.background = event.target.value;
  }
  lss('hi_sm_c',"set", hi_sm_c.value)
});
hi_u_c.addEventListener('change', (event) => {
  let un3 = document.querySelectorAll('.uniqueword');
  for (var i = 0; i < un3.length; i++) {
    un3[i].style.color = event.target.value;
  }
  lss('hi_u_c',"set", hi_u_c.value)
});
// a helper function to call when our request for dreams is done
const gettextListener = function () {
  dreamsList.innerHTML = "";
  dreams = this.responseText.split(" 1 ");
  let dream = dreams[c].split(/[0-9]+/);
  //console.log(c)
  for (var j = 0; j < dream.length; j++) {
    if (c <= 13) {
      append("Hebrews " + c + ":" + (j + 1) + " " + dream[j], "H" + c + ":" + (j + 1));
    } else if (c <= 19 && c > 13) {
      append("1Peter " + c + ":" + (j + 1) + " " + dream[j], "1P" + c + ":" + (j + 1));
    } else {
      append("2Peter " + c + ":" + (j + 1) + " " + dream[j], "2P" + c + ":" + (j + 1));
    }
  }
}


// request the dreams from our app's sqlite database
const hebrewsRequest = new XMLHttpRequest();
hebrewsRequest.onload = gettextListener;
hebrewsRequest.open('get', '/gettext');
hebrewsRequest.send();

var extractwords = function (string) {
  return string.match(/\w+/g)
};
RegExp.escape = function (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};
// a helper function that creates a list item for a given dream
const append = function (dream, id) {
  const newListItem = document.createElement('div');
  /**/
  if (hi_u) {
    for (var k = 0; k < unique.length; k++) {
      //unique[k] = "/\s"+unique[k]+"\s/i";
      //console.log(unique[k])
      //var r = new RegExp(unique[k], "i");
      //console.log(unique[k])
      if (unique[k].test(dream)) dream = dream;
      dream = dream.replace(unique[k], "<b style = 'color:"+lss('c_u_d',"get",false)+";' class = 'uniqueword'> $1 </b>");
    }
  }
  newListItem.innerHTML = dream;
  newListItem.id = id;
  newListItem.className = "verse";
  if (hi_sm) {
    for (var i = 0; i < smemlist.length; i++) {
      if (id === smemlist[i]) {
        newListItem.className = "memory-verse-s";
        newListItem.style.background = lss('c_sm_d',"get",false);
      }
    }
  }
  if (hi_mm) {
    for (var i = 0; i < mmemlist.length; i++) {
      if (id === mmemlist[i].r1 || id === mmemlist[i].r2) {
        newListItem.className = "memory-verse-m";
        newListItem.style.background = lss('c_mm_d',"get",false);
      }
    }
  }
  //console.log(newListItem)
  dreamsList.appendChild(newListItem);
}

