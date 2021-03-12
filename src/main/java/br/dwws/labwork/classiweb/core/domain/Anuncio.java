package br.dwws.labwork.classiweb.core.domain;

import java.util.Collection;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import br.ufes.inf.nemo.jbutler.ejb.persistence.PersistentObjectSupport;

/** TODO: generated by FrameWeb. Should be documented. */
@Entity
public class Anuncio extends PersistentObjectSupport implements Comparable<Anuncio> {
  /** Serialization id. */
  private static final long serialVersionUID = 1L;



  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  private String titulo;

  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  private String descricao;

  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  private short quantidade;

  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  private float preco;

  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  private EstadoProduto estadoProduto;

  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  private EstadoAnuncio estado;

  /** TODO: generated by FrameWeb. Should be documented. false */
  @NotNull
  public Collection fotos;



  /** TODO: generated by FrameWeb. Should be documented. */
  @ManyToOne
  private UsuarioComum Source;



  /** TODO: generated by FrameWeb. Should be documented. */
  @OneToOne
  private UsuarioComum Target;



  /** TODO: generated by FrameWeb. Should be documented. */
  @OneToOne(mappedBy="Target")
		private  Source;
		
	

		
		/** TODO: generated by FrameWeb. Should be documented. */
		@ManyToOne
		private Categoria Target;



  /** TODO: generated by FrameWeb. Should be documented. */
  @OneToOne
  private Endereco Target;



  /** TODO: generated by FrameWeb. Should be documented. */
  @ManyToOne
  private Endereco Target;



  /** TODO: generated by FrameWeb. Should be documented. */
  @ManyToOne
  private UsuarioComum Target;



  /** TODO: generated by FrameWeb. Should be documented. */
  @OneToMany(mappedBy = "Target")
  private Set<CompraFinalizada> Source;



  /** TODO: generated by FrameWeb. Should be documented. */
  @ManyToMany(mappedBy = "Target")
  private Set<UsuarioComum> Source;



  /** Getter for titulo. */
  public String getTitulo() {
    return titulo;
  }

  /** Setter for titulo. */
  public void setTitulo(String titulo) {
    this.titulo = titulo;
  }

  /** Getter for descricao. */
  public String getDescricao() {
    return descricao;
  }

  /** Setter for descricao. */
  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  /** Getter for quantidade. */
  public short getQuantidade() {
    return quantidade;
  }

  /** Setter for quantidade. */
  public void setQuantidade(short quantidade) {
    this.quantidade = quantidade;
  }

  /** Getter for preco. */
  public float getPreco() {
    return preco;
  }

  /** Setter for preco. */
  public void setPreco(float preco) {
    this.preco = preco;
  }

  /** Getter for estadoProduto. */
  public EstadoProduto getEstadoProduto() {
    return estadoProduto;
  }

  /** Setter for estadoProduto. */
  public void setEstadoProduto(EstadoProduto estadoProduto) {
    this.estadoProduto = estadoProduto;
  }

  /** Getter for estado. */
  public EstadoAnuncio getEstado() {
    return estado;
  }

  /** Setter for estado. */
  public void setEstado(EstadoAnuncio estado) {
    this.estado = estado;
  }

  /** Getter for fotos. */
  public Collection getFotos() {
    return fotos;
  }

  /** Setter for fotos. */
  public void setFotos(Collection fotos) {
    this.fotos = fotos;
  }



  /** Getter for Source. */
  public UsuarioComum getSource() {
    return Source;
  }

  /** Setter for Source. */
  public void setSource(UsuarioComum Source) {
    this.Source = Source;
  }



  /** Getter for Target. */
  public UsuarioComum getTarget() {
    return Target;
  }

  /** Setter for Target. */
  public void setTarget(UsuarioComum Target) {
    this.Target = Target;
  }



  /** Getter for Source. */
		public  getSource() {
			return Source;
		}

  /** Setter for Source. */
		public void setSource( Source) {
			this.Source = Source;
		}



  /** Getter for Target. */
  public Categoria getTarget() {
    return Target;
  }

  /** Setter for Target. */
  public void setTarget(Categoria Target) {
    this.Target = Target;
  }



  /** Getter for Target. */
  public Endereco getTarget() {
    return Target;
  }

  /** Setter for Target. */
  public void setTarget(Endereco Target) {
    this.Target = Target;
  }



  /** Getter for Target. */
  public Endereco getTarget() {
    return Target;
  }

  /** Setter for Target. */
  public void setTarget(Endereco Target) {
    this.Target = Target;
  }



  /** Getter for Target. */
  public UsuarioComum getTarget() {
    return Target;
  }

  /** Setter for Target. */
  public void setTarget(UsuarioComum Target) {
    this.Target = Target;
  }



  /** Getter for Source. */
  public Set<CompraFinalizada> getSource() {
    return Source;
  }

  /** Setter for Source. */
  public void setSource(Set<CompraFinalizada> Source) {
    this.Source = Source;
  }



  /** Getter for Source. */
  public Set<UsuarioComum> getSource() {
    return Source;
  }

  /** Setter for Source. */
  public void setSource(Set<UsuarioComum> Source) {
    this.Source = Source;
  }



  /** @see java.lang.Comparable#compareTo(java.lang.Object) */
  @Override
  public int compareTo(Anuncio o) {
    // FIXME: auto-generated method stub
    return super.compareTo(o);
  }
}
